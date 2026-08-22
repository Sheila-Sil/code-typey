import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createRoot } from "react-dom/client";

/* ----------------------------- snippet bank ----------------------------- */
/* Original short patterns (not copied from any real repo) covering heavy
   symbol use across common language idioms — brackets, arrows, generics,
   pointers, string interpolation, etc. */
const SNIPPETS = {
  cpp: {
    bronze: [
      `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    cout << n * 2 << "\\n";\n}`,
      `int arr[100];\nfor (int i = 0; i < n; i++) {\n    cin >> arr[i];\n}`,
      `if (a > b && b > c) {\n    cout << "sorted\\n";\n} else {\n    cout << "not sorted\\n";\n}`,
    ],
    silver: [
      `vector<int> v(n);\nfor (auto &x : v) cin >> x;\nsort(v.begin(), v.end());`,
      `map<string, int> freq;\nfor (auto &s : words) freq[s]++;`,
      `int lo = 0, hi = n - 1;\nwhile (lo < hi) {\n    int mid = (lo + hi) / 2;\n    if (a[mid] < target) lo = mid + 1;\n    else hi = mid;\n}`,
    ],
    gold: [
      `vector<vector<int>> adj(n + 1);\nfor (int i = 0; i < m; i++) {\n    int u, v;\n    cin >> u >> v;\n    adj[u].push_back(v);\n    adj[v].push_back(u);\n}`,
      `priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\npq.push({0, src});\nwhile (!pq.empty()) {\n    auto [d, u] = pq.top();\n    pq.pop();\n}`,
      `vector<vector<long long>> dp(n + 1, vector<long long>(cap + 1, 0));\nfor (int i = 1; i <= n; i++) {\n    for (int w = 0; w <= cap; w++) {\n        dp[i][w] = dp[i-1][w];\n        if (w >= wt[i]) dp[i][w] = max(dp[i][w], dp[i-1][w-wt[i]] + val[i]);\n    }\n}`,
    ],
    platinum: [
      `struct DSU {\n    vector<int> par, rnk;\n    DSU(int n) : par(n), rnk(n, 0) { iota(par.begin(), par.end(), 0); }\n    int find(int x) { return par[x] == x ? x : par[x] = find(par[x]); }\n};`,
      `struct SegTree {\n    vector<long long> tree;\n    SegTree(int n) : tree(4 * n, 0) {}\n    void update(int node, int lo, int hi, int idx, long long val) {\n        if (lo == hi) { tree[node] = val; return; }\n        int mid = (lo + hi) / 2;\n    }\n};`,
      `long long power(long long b, long long e, long long mod) {\n    long long res = 1;\n    b %= mod;\n    while (e > 0) {\n        if (e & 1) res = res * b % mod;\n        b = b * b % mod;\n        e >>= 1;\n    }\n    return res;\n}`,
    ],
  },
  java: {
    bronze: [
      `Scanner sc = new Scanner(System.in);\nint n = sc.nextInt();\nSystem.out.println(n * 2);`,
      `int[] arr = new int[100];\nfor (int i = 0; i < n; i++) {\n    arr[i] = sc.nextInt();\n}`,
      `if (a > b && b > c) {\n    System.out.println("sorted");\n} else {\n    System.out.println("not sorted");\n}`,
    ],
    silver: [
      `List<Integer> list = new ArrayList<>();\nfor (int i = 0; i < n; i++) list.add(sc.nextInt());\nCollections.sort(list);`,
      `Map<String, Integer> freq = new HashMap<>();\nfreq.put(word, freq.getOrDefault(word, 0) + 1);`,
      `int lo = 0, hi = n - 1;\nwhile (lo < hi) {\n    int mid = (lo + hi) / 2;\n    if (arr[mid] < target) lo = mid + 1;\n    else hi = mid;\n}`,
    ],
    gold: [
      `List<List<Integer>> adj = new ArrayList<>();\nfor (int i = 0; i <= n; i++) adj.add(new ArrayList<>());\nadj.get(u).add(v);`,
      `PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);\npq.offer(new int[]{0, src});\nwhile (!pq.isEmpty()) {\n    int[] cur = pq.poll();\n}`,
      `long[][] dp = new long[n + 1][cap + 1];\nfor (int i = 1; i <= n; i++) {\n    for (int w = 0; w <= cap; w++) {\n        dp[i][w] = dp[i-1][w];\n        if (w >= wt[i]) dp[i][w] = Math.max(dp[i][w], dp[i-1][w-wt[i]] + val[i]);\n    }\n}`,
    ],
    platinum: [
      `class DSU {\n    int[] par;\n    DSU(int n) {\n        par = new int[n];\n        for (int i = 0; i < n; i++) par[i] = i;\n    }\n    int find(int x) {\n        return par[x] == x ? x : (par[x] = find(par[x]));\n    }\n}`,
      `static long power(long b, long e, long mod) {\n    long res = 1;\n    b %= mod;\n    while (e > 0) {\n        if ((e & 1) == 1) res = res * b % mod;\n        b = b * b % mod;\n        e >>= 1;\n    }\n    return res;\n}`,
      `long[] tree = new long[4 * n];\nvoid update(int node, int lo, int hi, int idx, long val) {\n    if (lo == hi) { tree[node] = val; return; }\n    int mid = (lo + hi) / 2;\n}`,
    ],
  },
  python: {
    bronze: [
      `n = int(input())\nprint(n * 2)`,
      `arr = list(map(int, input().split()))\nfor x in arr:\n    print(x)`,
      `if a > b and b > c:\n    print("sorted")\nelse:\n    print("not sorted")`,
    ],
    silver: [
      `nums = sorted(map(int, input().split()))\nprint(nums[:3])`,
      `freq = {}\nfor w in words:\n    freq[w] = freq.get(w, 0) + 1`,
      `lo, hi = 0, n - 1\nwhile lo < hi:\n    mid = (lo + hi) // 2\n    if arr[mid] < target:\n        lo = mid + 1\n    else:\n        hi = mid`,
    ],
    gold: [
      `from collections import defaultdict, deque\nadj = defaultdict(list)\nfor u, v in edges:\n    adj[u].append(v)\n    adj[v].append(u)`,
      `import heapq\npq = [(0, src)]\nwhile pq:\n    d, u = heapq.heappop(pq)`,
      `dp = [[0] * (cap + 1) for _ in range(n + 1)]\nfor i in range(1, n + 1):\n    for w in range(cap + 1):\n        dp[i][w] = dp[i-1][w]\n        if w >= wt[i]:\n            dp[i][w] = max(dp[i][w], dp[i-1][w-wt[i]] + val[i])`,
    ],
    platinum: [
      `class DSU:\n    def __init__(self, n):\n        self.par = list(range(n))\n\n    def find(self, x):\n        if self.par[x] != x:\n            self.par[x] = self.find(self.par[x])\n        return self.par[x]`,
      `def power(b, e, mod):\n    res = 1\n    b %= mod\n    while e > 0:\n        if e & 1:\n            res = res * b % mod\n        b = b * b % mod\n        e >>= 1\n    return res`,
      `MOD = 10**9 + 7\nmemo = {}\ndef solve(i, j):\n    if (i, j) in memo:\n        return memo[(i, j)]\n    memo[(i, j)] = 0\n    return memo[(i, j)]`,
    ],
  },
};

const LANGUAGES = [
  { id: "cpp", label: "c++", ext: "cpp" },
  { id: "java", label: "java", ext: "java" },
  { id: "python", label: "python", ext: "py" },
];
const LEVELS = [
  { id: "bronze", label: "bronze" },
  { id: "silver", label: "silver" },
  { id: "gold", label: "gold" },
  { id: "platinum", label: "platinum" },
];

/* ------------------------------ keyboard map ----------------------------- */
const KEY_ROWS = [
  [
    { u: "`", s: "~" }, { u: "1", s: "!" }, { u: "2", s: "@" }, { u: "3", s: "#" },
    { u: "4", s: "$" }, { u: "5", s: "%" }, { u: "6", s: "^" }, { u: "7", s: "&" },
    { u: "8", s: "*" }, { u: "9", s: "(" }, { u: "0", s: ")" }, { u: "-", s: "_" },
    { u: "=", s: "+" }, { label: "\u232B", wide: 2, backspace: true },
  ],
  [
    { label: "tab", wide: 1.4 }, { u: "q" }, { u: "w" }, { u: "e" }, { u: "r" }, { u: "t" },
    { u: "y" }, { u: "u" }, { u: "i" }, { u: "o" }, { u: "p" }, { u: "[", s: "{" }, { u: "]", s: "}" }, { u: "\\", s: "|" },
  ],
  [
    { label: "caps", wide: 1.6 }, { u: "a" }, { u: "s" }, { u: "d" }, { u: "f" }, { u: "g" }, { u: "h" },
    { u: "j" }, { u: "k" }, { u: "l" }, { u: ";", s: ":" }, { u: "'", s: '"' }, { label: "enter", wide: 1.9 },
  ],
  [
    { label: "shift", wide: 2 }, { u: "z" }, { u: "x" }, { u: "c" }, { u: "v" }, { u: "b" }, { u: "n" }, { u: "m" },
    { u: ",", s: "<" }, { u: ".", s: ">" }, { u: "/", s: "?" }, { label: "shift", wide: 2 },
  ],
  [{ label: "space", wide: 8, u: " " }],
];

const IGNORED_KEYS = new Set([
  "Shift", "Control", "Alt", "Meta", "CapsLock", "Escape", "Tab",
  "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End",
  "PageUp", "PageDown", "Insert", "Delete", "ContextMenu",
]);

function displayChar(ch) {
  if (ch === "\n") return "\u23CE";
  if (ch === " ") return "\u00B7";
  return ch;
}

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function pickSnippet(lang, level, missedChars, usedSet) {
  const pool = SNIPPETS[lang][level];
  const scored = pool.map((snippet, i) => {
    let score = 0;
    for (const ch of snippet) score += missedChars[ch] || 0;
    return { i, snippet, score, used: usedSet.has(i) };
  });
  const fresh = scored.filter((s) => !s.used);
  const candidates = fresh.length ? fresh : scored;
  candidates.sort((a, b) => b.score - a.score);
  // among top-scoring ties, add a little randomness so it doesn't feel robotic
  const topScore = candidates[0].score;
  const top = candidates.filter((c) => c.score === topScore);
  const pick = top[Math.floor(Math.random() * top.length)];
  if (fresh.length === 0) usedSet.clear();
  usedSet.add(pick.i);
  return pick.snippet;
}

export default function TypeTrainer() {
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState("cpp");
  const [level, setLevel] = useState("bronze");

  const [target, setTarget] = useState("");
  const [cursor, setCursor] = useState(0);
  const [results, setResults] = useState([]); // true/false/null per index
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [correctAttempts, setCorrectAttempts] = useState(0);
  const [backspaceCount, setBackspaceCount] = useState(0);
  const [startedAt, setStartedAt] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [missedChars, setMissedChars] = useState({});
  const [history, setHistory] = useState([]);
  const [focused, setFocused] = useState(false);

  const usedSetRef = useRef({});
  const zoneRef = useRef(null);
  const intervalRef = useRef(null);

  const getUsedSet = useCallback((lang, lvl) => {
    const key = `${lang}-${lvl}`;
    if (!usedSetRef.current[key]) usedSetRef.current[key] = new Set();
    return usedSetRef.current[key];
  }, []);

  const loadLesson = useCallback(
    (lang, lvl, missed) => {
      const snippet = pickSnippet(lang, lvl, missed, getUsedSet(lang, lvl));
      setTarget(snippet);
      setCursor(0);
      setResults(new Array(snippet.length).fill(null));
      setTotalAttempts(0);
      setCorrectAttempts(0);
      setBackspaceCount(0);
      setStartedAt(null);
      setElapsed(0);
      setCompleted(false);
    },
    [getUsedSet]
  );

  useEffect(() => {
    loadLesson(language, level, missedChars);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, level]);

  useEffect(() => {
    if (startedAt && !completed) {
      intervalRef.current = setInterval(() => setElapsed(Date.now() - startedAt), 250);
      return () => clearInterval(intervalRef.current);
    }
  }, [startedAt, completed]);

  useEffect(() => {
    zoneRef.current && zoneRef.current.focus();
  }, [target]);

  const finishLesson = useCallback(
    (finalCorrect, finalTotal, finalBackspaces, finalElapsed) => {
      const minutes = Math.max(finalElapsed / 60000, 1 / 60);
      const netWpm = Math.round(finalCorrect / 5 / minutes);
      const rawWpm = Math.round(finalTotal / 5 / minutes);
      const accuracy = finalTotal ? Math.round((finalCorrect / finalTotal) * 100) : 100;
      setHistory((h) => [
        {
          ts: new Date(),
          language,
          level,
          netWpm,
          rawWpm,
          accuracy,
          backspaces: finalBackspaces,
          time: finalElapsed,
        },
        ...h,
      ].slice(0, 30));
      setCompleted(true);
    },
    [language, level]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (completed) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (IGNORED_KEYS.has(e.key)) return;

      let ch = null;
      if (e.key === "Backspace") {
        e.preventDefault();
        if (cursor === 0) return;
        const newCursor = cursor - 1;
        setBackspaceCount((b) => b + 1);
        setResults((r) => {
          const copy = [...r];
          copy[newCursor] = null;
          return copy;
        });
        setCursor(newCursor);
        return;
      } else if (e.key === "Enter") {
        ch = "\n";
      } else if (e.key.length === 1) {
        ch = e.key;
      } else {
        return;
      }

      e.preventDefault();
      const t0 = startedAt || Date.now();
      if (!startedAt) setStartedAt(t0);

      const expected = target[cursor];
      const isCorrect = ch === expected;

      const newTotal = totalAttempts + 1;
      const newCorrect = correctAttempts + (isCorrect ? 1 : 0);
      setTotalAttempts(newTotal);
      if (isCorrect) setCorrectAttempts(newCorrect);
      else {
        setMissedChars((m) => ({ ...m, [expected]: (m[expected] || 0) + 1 }));
      }
      setResults((r) => {
        const copy = [...r];
        copy[cursor] = isCorrect;
        return copy;
      });

      const newCursor = cursor + 1;
      setCursor(newCursor);

      if (newCursor >= target.length) {
        const finalElapsed = Date.now() - t0;
        finishLesson(newCorrect, newTotal, backspaceCount, finalElapsed || 1);
      }
    },
    [cursor, target, startedAt, totalAttempts, correctAttempts, backspaceCount, completed, finishLesson]
  );

  const nextLesson = useCallback(() => {
    loadLesson(language, level, missedChars);
  }, [loadLesson, language, level, missedChars]);

  const resetAll = useCallback(() => {
    setMissedChars({});
    setHistory([]);
    usedSetRef.current = {};
    loadLesson(language, level, {});
  }, [loadLesson, language, level]);

  /* ------------------------------- live stats ------------------------------- */
  const minutes = Math.max(elapsed / 60000, 1 / 60);
  const liveNetWpm = startedAt ? Math.round(correctAttempts / 5 / minutes) : 0;
  const liveRawWpm = startedAt ? Math.round(totalAttempts / 5 / minutes) : 0;
  const liveAccuracy = totalAttempts ? Math.round((correctAttempts / totalAttempts) * 100) : 100;

  const maxMissed = useMemo(() => Math.max(1, ...Object.values(missedChars)), [missedChars]);
  const missedList = useMemo(
    () => Object.entries(missedChars).sort((a, b) => b[1] - a[1]).slice(0, 12),
    [missedChars]
  );

  const langMeta = LANGUAGES.find((l) => l.id === language);

  return (
    <div className="tt-root" data-theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .tt-root {
          --bg: #0a0e14;
          --panel: #10151d;
          --elevated: #161c26;
          --border: #232b38;
          --text: #e6edf3;
          --dim: #6b7685;
          --amber: #ffb454;
          --green: #7ee787;
          --red: #ff6b6b;
          --blue: #6cb6ff;
          --radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          padding: 18px;
          box-sizing: border-box;
          transition: background .2s, color .2s;
        }
        .tt-root[data-theme="light"] {
          --bg: #f3f4f1;
          --panel: #ffffff;
          --elevated: #f8f9f7;
          --border: #d8dee5;
          --text: #1b1f24;
          --dim: #6e7781;
          --amber: #a3610f;
          --green: #1a7f37;
          --red: #cf222e;
          --blue: #0969da;
        }
        .tt-root * { box-sizing: border-box; }
        .tt-shell {
          max-width: 1180px;
          margin: 0 auto;
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          background: var(--panel);
          box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }
        .tt-titlebar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 16px;
          background: var(--elevated);
          border-bottom: 1px solid var(--border);
        }
        .tt-dots { display: flex; gap: 7px; }
        .tt-dots span { width: 11px; height: 11px; border-radius: 50%; display: inline-block; }
        .tt-dots span:nth-child(1) { background: #ff5f56; }
        .tt-dots span:nth-child(2) { background: #ffbd2e; }
        .tt-dots span:nth-child(3) { background: #27c93f; }
        .tt-titletext { color: var(--dim); font-size: 12.5px; letter-spacing: .02em; }
        .tt-toggle {
          display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--dim);
        }
        .tt-switch {
          width: 38px; height: 20px; border-radius: 999px; background: var(--border);
          position: relative; cursor: pointer; border: none; padding: 0;
        }
        .tt-switch::after {
          content: ''; position: absolute; top: 2px; left: 2px; width: 16px; height: 16px;
          border-radius: 50%; background: var(--amber); transition: transform .15s;
        }
        .tt-switch[data-on="1"]::after { transform: translateX(18px); }

        .tt-header {
          padding: 18px 24px 6px;
        }
        .tt-h1 { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; margin: 0; }
        .tt-h1 .amber { color: var(--amber); }
        .tt-sub { color: var(--dim); font-size: 12.5px; margin-top: 6px; line-height: 1.6; max-width: 640px; }

        .tt-cmdbar {
          margin: 14px 24px 0;
          padding: 10px 14px;
          background: var(--elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          font-size: 13px;
        }
        .tt-prompt { color: var(--green); }
        .tt-flag { color: var(--dim); }
        .tt-select {
          background: var(--panel);
          border: 1px solid var(--border);
          color: var(--amber);
          font-family: inherit;
          font-size: 13px;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        }
        .tt-btn {
          margin-left: auto;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text);
          font-family: inherit;
          font-size: 12.5px;
          padding: 5px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        .tt-btn:hover { border-color: var(--amber); color: var(--amber); }
        .tt-btn.ghost { color: var(--dim); }

        .tt-main {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 18px;
          padding: 18px 24px 24px;
        }
        @media (max-width: 860px) {
          .tt-main { grid-template-columns: 1fr; }
        }

        .tt-zone {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 20px;
          outline: none;
          cursor: text;
          min-height: 220px;
        }
        .tt-zone[data-focused="0"] { border-color: var(--red); }
        .tt-hint { font-size: 11px; color: var(--dim); margin-bottom: 10px; }
        .tt-code {
          font-size: 16px;
          line-height: 1.85;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .ch { position: relative; }
        .ch.pending { color: var(--dim); }
        .ch.correct { color: var(--text); }
        .ch.incorrect { color: var(--red); background: rgba(255,107,107,0.16); border-radius: 2px; }
        .ch.current { background: var(--amber); color: var(--bg); border-radius: 2px; animation: blink 1s step-end infinite; }
        .ch.nl { color: var(--dim); font-size: 12px; }
        @keyframes blink { 50% { background: transparent; color: var(--amber); outline: 1px solid var(--amber); } }
        .tt-done {
          margin-top: 14px; padding: 12px; border: 1px dashed var(--green);
          border-radius: var(--radius); color: var(--green); font-size: 13px;
        }

        .tt-side { display: flex; flex-direction: column; gap: 14px; }
        .tt-card {
          background: var(--elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 14px;
        }
        .tt-card h3 {
          font-size: 10.5px; text-transform: uppercase; letter-spacing: .1em;
          color: var(--dim); margin: 0 0 10px;
        }
        .tt-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .tt-stat-big { font-size: 26px; font-weight: 700; color: var(--amber); line-height: 1; }
        .tt-stat-label { font-size: 10px; color: var(--dim); margin-top: 4px; }
        .tt-stat-sm { font-size: 15px; font-weight: 600; }

        .kb { display: flex; flex-direction: column; gap: 4px; }
        .kb-row { display: flex; gap: 4px; }
        .kb-key {
          flex: 1;
          font-size: 9px;
          text-align: center;
          padding: 5px 2px;
          border-radius: 3px;
          border: 1px solid var(--border);
          color: var(--dim);
          background: var(--panel);
          position: relative;
        }
        .kb-key .u { display:block; font-size: 10px; color: var(--text); }
        .kb-key .s { display:block; font-size: 7.5px; opacity: .7; }

        .missed-list { display: flex; flex-wrap: wrap; gap: 6px; }
        .missed-chip {
          font-size: 12px; padding: 3px 7px; border-radius: 4px;
          border: 1px solid var(--border); background: var(--panel);
          display: flex; align-items: center; gap: 5px;
        }
        .missed-chip .cnt { color: var(--dim); font-size: 10px; }
        .empty-note { color: var(--dim); font-size: 11.5px; }

        .log-list { display: flex; flex-direction: column; gap: 6px; max-height: 220px; overflow-y: auto; }
        .log-row { font-size: 11px; color: var(--dim); display: flex; gap: 6px; }
        .log-row .tag { color: var(--blue); }
        .log-row .wpm { color: var(--green); }
        .log-row .acc { color: var(--amber); }
      `}</style>

      <div className="tt-shell">
        <div className="tt-titlebar">
          <div className="tt-dots"><span /><span /><span /></div>
          <div className="tt-titletext">contest-typer — {langMeta.label}/{level}</div>
          <div className="tt-toggle">
            <span>light</span>
            <button
              className="tt-switch"
              data-on={theme === "dark" ? 1 : 0}
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              aria-label="toggle theme"
            />
            <span>dark</span>
          </div>
        </div>

        <div className="tt-header">
          <h1 className="tt-h1">
            <span className="amber">$</span> CodeTypey 
          </h1>
          <div className="tt-sub">
            Boilerplate and idioms pulled from real contest patterns — <code>{`#include <bits/stdc++.h>`}</code>,
            STL containers, DSU, segment trees, DP tables. Every <code>{`{ } < > :: & * %`}</code> and every
            backspace counts toward your score, because that's exactly what costs you time on the clock.
          </div>
        </div>

        <div className="tt-cmdbar">
          <span className="tt-prompt">$</span>
          <span>run</span>
          <span className="tt-flag">--lang</span>
          <select className="tt-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
          <span className="tt-flag">--division</span>
          <select className="tt-select" value={level} onChange={(e) => setLevel(e.target.value)}>
            {LEVELS.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
          <button className="tt-btn" onClick={nextLesson}>new snippet</button>
          <button className="tt-btn ghost" onClick={resetAll}>reset stats</button>
        </div>

        <div className="tt-main">
          <div
            className="tt-zone"
            ref={zoneRef}
            tabIndex={0}
            data-focused={focused ? 1 : 0}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          >
            <div className="tt-hint">
              {focused ? "typing…  ⏎ = enter · · = space" : "click here and start typing"}
            </div>
            <div className="tt-code">
              {target.split("").map((c, i) => {
                let cls = "pending";
                if (results[i] === true) cls = "correct";
                else if (results[i] === false) cls = "incorrect";
                if (i === cursor) cls = "current";
                const isNl = c === "\n";
                return (
                  <React.Fragment key={i}>
                    <span className={`ch ${cls}${isNl ? " nl" : ""}`}>{displayChar(c)}</span>
                    {isNl && <br />}
                  </React.Fragment>
                );
              })}
            </div>
            {completed && (
              <div className="tt-done">
                lesson complete — {liveNetWpm} net wpm · {liveAccuracy}% accuracy. Click "new snippet" to continue
                {missedList.length ? ", weighted toward the keys you missed." : "."}
              </div>
            )}
          </div>

          <div className="tt-side">
            <div className="tt-card">
              <h3>live</h3>
              <div className="tt-stats-grid">
                <div>
                  <div className="tt-stat-big">{liveNetWpm}</div>
                  <div className="tt-stat-label">net wpm</div>
                </div>
                <div>
                  <div className="tt-stat-big" style={{ color: "var(--blue)" }}>{liveRawWpm}</div>
                  <div className="tt-stat-label">raw wpm</div>
                </div>
                <div>
                  <div className="tt-stat-sm">{liveAccuracy}%</div>
                  <div className="tt-stat-label">accuracy</div>
                </div>
                <div>
                  <div className="tt-stat-sm">{fmtTime(elapsed)}</div>
                  <div className="tt-stat-label">time</div>
                </div>
                <div>
                  <div className="tt-stat-sm">{backspaceCount}</div>
                  <div className="tt-stat-label">backspaces</div>
                </div>
                <div>
                  <div className="tt-stat-sm">{totalAttempts}</div>
                  <div className="tt-stat-label">keystrokes</div>
                </div>
              </div>
            </div>

            <div className="tt-card">
              <h3>missed keys</h3>
              {missedList.length ? (
                <div className="missed-list">
                  {missedList.map(([ch, n]) => (
                    <div className="missed-chip" key={ch}>
                      <span>{displayChar(ch)}</span>
                      <span className="cnt">{n}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-note">nothing missed yet — keep typing</div>
              )}
            </div>

            <div className="tt-card">
              <h3>keyboard heatmap</h3>
              <div className="kb">
                {KEY_ROWS.map((row, ri) => (
                  <div className="kb-row" key={ri}>
                    {row.map((k, ki) => {
                      if (k.label && !k.u) {
                        const isBs = k.backspace;
                        const alpha = isBs ? Math.min(1, backspaceCount / 15) : 0;
                        return (
                          <div
                            key={ki}
                            className="kb-key"
                            style={{
                              flex: k.wide || 1,
                              background: isBs ? `rgba(108,182,255,${0.12 + alpha * 0.55})` : undefined,
                              borderColor: isBs && alpha > 0 ? "var(--blue)" : undefined,
                              color: isBs && alpha > 0 ? "var(--blue)" : undefined,
                            }}
                          >
                            {k.label}
                          </div>
                        );
                      }
                      const count = (missedChars[k.u] || 0) + (k.s ? missedChars[k.s] || 0 : 0);
                      const alpha = count ? 0.15 + 0.65 * (count / maxMissed) : 0;
                      return (
                        <div
                          key={ki}
                          className="kb-key"
                          style={{
                            flex: k.wide || 1,
                            background: count ? `rgba(255,107,107,${alpha})` : undefined,
                            borderColor: count ? "var(--red)" : undefined,
                          }}
                          title={`${k.u}${k.s ? "/" + k.s : ""}: ${count} missed`}
                        >
                          {k.s && <span className="s">{k.s}</span>}
                          <span className="u">{k.u === " " ? "" : k.u}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="tt-card">
              <h3>session log</h3>
              {history.length ? (
                <div className="log-list">
                  {history.map((h, i) => (
                    <div className="log-row" key={i}>
                      <span>{h.ts.toTimeString().slice(0, 8)}</span>
                      <span className="tag">{h.language}/{h.level}</span>
                      <span className="wpm">{h.netWpm}wpm</span>
                      <span className="acc">{h.accuracy}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-note">completed lessons will show up here</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- mount the app --------------------------- */
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TypeTrainer />
  </React.StrictMode>
);
