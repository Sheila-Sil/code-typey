/**
 * Lightweight syntax colouring for the lesson text.
 *
 * This is a tokenizer, not a parser: it only has to tell keywords, types,
 * strings, numbers and comments apart well enough that the code reads like
 * code instead of a grey wall. It returns one token kind per character so the
 * typing surface can colour each span without re-slicing the text, and it
 * never throws — an unknown language or odd input just comes back uncoloured.
 */

const COMMON = ["if", "else", "for", "while", "return", "break", "continue", "true", "false"];

const KEYWORDS = {
  cpp: [
    ...COMMON,
    "auto", "const", "constexpr", "struct", "class", "public", "private", "template",
    "typename", "using", "namespace", "new", "delete", "do", "switch", "case", "default",
    "static", "inline", "operator", "this", "nullptr", "sizeof", "goto",
  ],
  java: [
    ...COMMON,
    "class", "public", "private", "protected", "static", "final", "void", "new", "this",
    "import", "package", "extends", "implements", "interface", "throws", "throw", "try",
    "catch", "finally", "do", "switch", "case", "default", "null", "instanceof", "var",
    "record", "enum", "super",
  ],
  python: [
    ...COMMON.filter((k) => k !== "true" && k !== "false"),
    "def", "elif", "in", "not", "and", "or", "is", "lambda", "import", "from", "as",
    "class", "pass", "yield", "with", "global", "nonlocal", "None", "True", "False", "try",
    "except", "finally", "raise", "del", "assert",
  ],
  rust: [
    ...COMMON,
    "fn", "let", "mut", "pub", "struct", "enum", "impl", "trait", "use", "mod", "match",
    "loop", "in", "as", "ref", "move", "where", "const", "static", "Self", "self", "crate",
    "unsafe", "dyn", "type",
  ],
  go: [
    ...COMMON,
    "func", "var", "const", "type", "struct", "interface", "map", "chan", "range",
    "package", "import", "defer", "go", "select", "switch", "case", "default", "nil",
    "fallthrough", "goto",
  ],
  javascript: [
    ...COMMON,
    "const", "let", "var", "function", "new", "of", "in", "class", "extends", "this",
    "null", "undefined", "typeof", "instanceof", "do", "switch", "case", "default", "try",
    "catch", "finally", "throw", "yield", "async", "await", "import", "export", "from",
    "delete", "void",
  ],
};

const TYPES = {
  cpp: [
    "int", "long", "short", "char", "bool", "double", "float", "void", "unsigned", "signed",
    "size_t", "string", "vector", "pair", "map", "set", "unordered_map", "unordered_set",
    "queue", "priority_queue", "deque", "stack", "array", "bitset", "tuple", "multiset",
  ],
  java: ["int", "long", "short", "char", "boolean", "double", "float", "byte", "String"],
  python: ["int", "str", "float", "list", "dict", "set", "tuple", "bool", "range", "len"],
  rust: [
    "i8", "i16", "i32", "i64", "i128", "isize", "u8", "u16", "u32", "u64", "u128",
    "usize", "f32", "f64", "bool", "char", "str", "String", "Vec", "Option", "Some",
    "None", "Ok", "Err", "Result", "Box",
  ],
  go: [
    "int", "int8", "int16", "int32", "int64", "uint", "uint8", "uint16", "uint32",
    "uint64", "float32", "float64", "string", "byte", "rune", "bool", "error",
    "make", "append", "len", "cap",
  ],
  javascript: [
    "Array", "Map", "Set", "Math", "Number", "String", "BigInt", "Int32Array",
    "Uint8Array", "Float64Array", "Infinity", "NaN",
  ],
};

const LINE_COMMENT = { python: "#" };

const SETS = {};
for (const lang of Object.keys(KEYWORDS)) {
  SETS[lang] = { kw: new Set(KEYWORDS[lang]), type: new Set(TYPES[lang] || []) };
}

const isIdentStart = (c) => /[A-Za-z_]/.test(c);
const isIdent = (c) => /[A-Za-z0-9_]/.test(c);
const isDigit = (c) => c >= "0" && c <= "9";

/**
 * Returns an array the length of `code`, holding "kw" | "type" | "str" |
 * "num" | "com" | null for each character.
 */
export function highlight(code, lang) {
  const out = new Array(code.length).fill(null);
  const sets = SETS[lang];
  if (!sets || !code) return out;

  const lineComment = LINE_COMMENT[lang] || "//";
  const mark = (from, to, kind) => {
    for (let k = from; k < to && k < code.length; k++) out[k] = kind;
  };

  let i = 0;
  while (i < code.length) {
    const c = code[i];

    // C++ preprocessor lines read as keywords from the hash to the end.
    if (lang === "cpp" && c === "#" && (i === 0 || code[i - 1] === "\n")) {
      let j = i;
      while (j < code.length && code[j] !== "\n" && code[j] !== "<" && code[j] !== '"') j++;
      mark(i, j, "kw");
      i = j;
      continue;
    }

    if (code.startsWith(lineComment, i)) {
      let j = i;
      while (j < code.length && code[j] !== "\n") j++;
      mark(i, j, "com");
      i = j;
      continue;
    }

    if (lineComment === "//" && code.startsWith("/*", i)) {
      const end = code.indexOf("*/", i + 2);
      const j = end === -1 ? code.length : end + 2;
      mark(i, j, "com");
      i = j;
      continue;
    }

    // Rust lifetimes ('a) look like an unterminated char literal; only treat a
    // single quote as a string when it closes within a few characters.
    if (c === '"' || (c === "'" && charLiteralEnd(code, i, lang) !== -1)) {
      const j = c === "'" ? charLiteralEnd(code, i, lang) : stringEnd(code, i);
      mark(i, j, "str");
      i = j;
      continue;
    }

    if (isDigit(c) && (i === 0 || !isIdent(code[i - 1]))) {
      let j = i + 1;
      while (j < code.length && (isIdent(code[j]) || (code[j] === "." && isDigit(code[j + 1] ?? "")))) j++;
      mark(i, j, "num");
      i = j;
      continue;
    }

    if (isIdentStart(c)) {
      let j = i + 1;
      while (j < code.length && isIdent(code[j])) j++;
      const word = code.slice(i, j);
      if (sets.kw.has(word)) mark(i, j, "kw");
      else if (sets.type.has(word)) mark(i, j, "type");
      i = j;
      continue;
    }

    i++;
  }

  return out;
}

function stringEnd(code, start) {
  let j = start + 1;
  while (j < code.length && code[j] !== "\n") {
    if (code[j] === "\\") j += 2;
    else if (code[j] === '"') return j + 1;
    else j++;
  }
  return j;
}

function charLiteralEnd(code, start, lang) {
  // Python and JavaScript use single quotes for ordinary strings.
  if (lang === "python" || lang === "javascript") {
    let j = start + 1;
    while (j < code.length && code[j] !== "\n") {
      if (code[j] === "\\") j += 2;
      else if (code[j] === "'") return j + 1;
      else j++;
    }
    return -1;
  }
  const limit = Math.min(code.length, start + 5);
  for (let j = start + 1; j < limit; j++) {
    if (code[j] === "\\") {
      j++;
      continue;
    }
    if (code[j] === "'") return j > start + 1 ? j + 1 : -1;
    if (code[j] === "\n") return -1;
  }
  return -1;
}
