import { dedent } from "./dedent.js";

/**
 * JavaScript contest patterns. Arrow functions, destructuring and spread give a
 * heavy load of brackets, arrows and dots.
 *
 * Note: these deliberately avoid backtick template literals. The corpus is
 * itself authored inside tagged template literals, and a backtick would have to
 * be escaped — which would then be part of what you type.
 */
export const JAVASCRIPT = {
  bronze: [
    {
      topic: "fast io",
      title: "read all of stdin",
      code: dedent`
        const data = require('fs').readFileSync(0, 'utf8');
        const lines = data.split('\n');
        let ptr = 0;
        const next = () => lines[ptr++].trim();

        const n = Number(next());
        console.log(n * 2);
      `,
    },
    {
      topic: "arrays",
      title: "parse a line of ints",
      code: dedent`
        const a = next().split(' ').map(Number);
      `,
    },
    {
      topic: "arrays",
      title: "sum and maximum",
      code: dedent`
        const total = a.reduce((acc, x) => acc + x, 0);
        const best = Math.max(...a);
        console.log(total, best);
      `,
    },
    {
      topic: "branching",
      title: "chained comparison",
      code: dedent`
        if (a > b && b > c) {
            console.log('decreasing');
        } else if (a < b && b < c) {
            console.log('increasing');
        } else {
            console.log('neither');
        }
      `,
    },
    {
      topic: "strings",
      title: "palindrome check",
      code: dedent`
        const isPalindrome = (s) => {
            for (let lo = 0, hi = s.length - 1; lo < hi; lo++, hi--) {
                if (s[lo] !== s[hi]) return false;
            }
            return true;
        };
      `,
    },
    {
      topic: "counting",
      title: "frequency map",
      code: dedent`
        const freq = new Map();
        for (const w of words) {
            freq.set(w, (freq.get(w) ?? 0) + 1);
        }
      `,
    },
    {
      topic: "grids",
      title: "build a 2D array",
      code: dedent`
        const grid = Array.from({ length: r }, () => new Array(c).fill(0));
      `,
    },
    {
      topic: "math",
      title: "gcd with bigint",
      code: dedent`
        const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));
      `,
    },
    {
      topic: "loops",
      title: "count down",
      code: dedent`
        for (let i = n - 1; i >= 0; i--) {
            if (a[i] > best) {
                best = a[i];
                leaders.push(i);
            }
        }
        leaders.reverse();
      `,
    },
    {
      topic: "strings",
      title: "count vowels",
      code: dedent`
        const vowels = [...s].filter((c) => "aeiou".includes(c)).length;
        console.log(vowels);
      `,
    },
    {
      topic: "math",
      title: "digit sum",
      code: dedent`
        const digitSum = (x) => {
            let s = 0;
            while (x > 0) {
                s += x % 10;
                x = Math.floor(x / 10);
            }
            return s;
        };
      `,
    },
    {
      topic: "destructuring",
      title: "swap and unpack",
      code: dedent`
        let [lo, hi] = [a[0], a[n - 1]];
        if (lo > hi) [lo, hi] = [hi, lo];
        const { length: len } = a;
        const [first, ...rest] = a;
        console.log(lo, hi, len, first, rest.length);
      `,
    },
    {
      topic: "simulation",
      title: "bucket pouring",
      code: dedent`
        const cap = [0, 0, 0];
        const amt = [0, 0, 0];
        for (let step = 0; step < 100; step++) {
            const from = step % 3, to = (step + 1) % 3;
            const pour = Math.min(amt[from], cap[to] - amt[to]);
            amt[from] -= pour;
            amt[to] += pour;
        }
      `,
    },
    {
      topic: "grids",
      title: "four-direction neighbours",
      code: dedent`
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
            if (grid[nr][nc] === "#") walls++;
        }
      `,
    },
  ],

  silver: [
    {
      topic: "sorting",
      title: "sort with a tiebreak",
      code: dedent`
        items.sort((x, y) => x.weight - y.weight || y.value - x.value);
      `,
    },
    {
      topic: "binary search",
      title: "lower bound",
      code: dedent`
        const lowerBound = (arr, target) => {
            let lo = 0, hi = arr.length;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (arr[mid] < target) lo = mid + 1;
                else hi = mid;
            }
            return lo;
        };
      `,
    },
    {
      topic: "two pointers",
      title: "pair summing to target",
      code: dedent`
        let [lo, hi] = [0, n - 1];
        while (lo < hi) {
            const sum = a[lo] + a[hi];
            if (sum === target) break;
            sum < target ? lo++ : hi--;
        }
      `,
    },
    {
      topic: "prefix sums",
      title: "1D prefix sums",
      code: dedent`
        const pre = new Array(n + 1).fill(0);
        for (let i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + a[i];
        }
        const rangeSum = pre[r + 1] - pre[l];
      `,
    },
    {
      topic: "bfs",
      title: "flood fill on a grid",
      code: dedent`
        const queue = [[sr, sc]];
        seen[sr][sc] = true;
        for (let head = 0; head < queue.length; head++) {
            const [r, c] = queue[head];
            for (const [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
                const nr = r + dr, nc = c + dc;
                if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
                if (seen[nr][nc] || grid[nr][nc] === '#') continue;
                seen[nr][nc] = true;
                queue.push([nr, nc]);
            }
        }
      `,
    },
    {
      topic: "graphs",
      title: "adjacency list",
      code: dedent`
        const adj = Array.from({ length: n + 1 }, () => []);
        for (let i = 0; i < m; i++) {
            const [u, v] = next().split(' ').map(Number);
            adj[u].push(v);
            adj[v].push(u);
        }
      `,
    },
    {
      topic: "greedy",
      title: "interval scheduling",
      code: dedent`
        iv.sort((x, y) => x[1] - y[1]);
        let taken = 0, lastEnd = -Infinity;
        for (const [start, end] of iv) {
            if (start >= lastEnd) {
                taken++;
                lastEnd = end;
            }
        }
      `,
    },
    {
      topic: "sets",
      title: "dedupe and rank",
      code: dedent`
        const vals = [...new Set(a)].sort((x, y) => x - y);
        const rank = new Map(vals.map((v, i) => [v, i]));
      `,
    },
    {
      topic: "prefix sums",
      title: "2D prefix sums",
      code: dedent`
        const p = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                p[i + 1][j + 1] = g[i][j] + p[i][j + 1] + p[i + 1][j] - p[i][j];
            }
        }
        const rect = (r1, c1, r2, c2) => p[r2][c2] - p[r1][c2] - p[r2][c1] + p[r1][c1];
      `,
    },
    {
      topic: "binary search",
      title: "binary search on the answer",
      code: dedent`
        let lo = 0, hi = 2e9;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (feasible(mid)) hi = mid;
            else lo = mid + 1;
        }
        console.log(lo);
      `,
    },
    {
      topic: "dfs",
      title: "iterative dfs with a stack",
      code: dedent`
        const seen = new Uint8Array(n);
        const stack = [0];
        seen[0] = 1;
        while (stack.length) {
            const u = stack.pop();
            for (const v of adj[u]) {
                if (!seen[v]) {
                    seen[v] = 1;
                    stack.push(v);
                }
            }
        }
      `,
    },
    {
      topic: "sliding window",
      title: "longest window under a budget",
      code: dedent`
        let l = 0, sum = 0, best = 0;
        for (let r = 0; r < n; r++) {
            sum += a[r];
            while (sum > k) sum -= a[l++];
            best = Math.max(best, r - l + 1);
        }
      `,
    },
    {
      topic: "counting",
      title: "group by key",
      code: dedent`
        const groups = new Map();
        for (const [name, score] of rows) {
            if (!groups.has(name)) groups.set(name, []);
            groups.get(name).push(score);
        }
        for (const [name, scores] of groups) {
            console.log(name, Math.max(...scores));
        }
      `,
    },
    {
      topic: "compression",
      title: "coordinate compression",
      code: dedent`
        const xs = [...new Set(a)].sort((x, y) => x - y);
        const id = new Map(xs.map((x, i) => [x, i]));
        const b = a.map((x) => id.get(x));
      `,
    },
  ],

  gold: [
    {
      topic: "shortest paths",
      title: "dijkstra with a binary heap",
      code: dedent`
        const dist = new Array(n).fill(Infinity);
        dist[src] = 0;
        const pq = new MinHeap();
        pq.push([0, src]);
        while (pq.size > 0) {
            const [d, u] = pq.pop();
            if (d > dist[u]) continue;
            for (const [v, w] of adj[u]) {
                if (d + w < dist[v]) {
                    dist[v] = d + w;
                    pq.push([dist[v], v]);
                }
            }
        }
      `,
    },
    {
      topic: "heaps",
      title: "sift up",
      code: dedent`
        push(item) {
            this.data.push(item);
            let i = this.data.length - 1;
            while (i > 0) {
                const parent = (i - 1) >> 1;
                if (this.data[parent][0] <= this.data[i][0]) break;
                [this.data[parent], this.data[i]] = [this.data[i], this.data[parent]];
                i = parent;
            }
        }
      `,
    },
    {
      topic: "dsu",
      title: "union-find",
      code: dedent`
        class DSU {
            constructor(n) {
                this.par = Array.from({ length: n }, (_, i) => i);
                this.sz = new Array(n).fill(1);
            }
            find(x) {
                while (this.par[x] !== x) {
                    this.par[x] = this.par[this.par[x]];
                    x = this.par[x];
                }
                return x;
            }
        }
      `,
    },
    {
      topic: "dp",
      title: "0/1 knapsack",
      code: dedent`
        const dp = new Array(cap + 1).fill(0);
        for (let i = 0; i < n; i++) {
            for (let w = cap; w >= wt[i]; w--) {
                dp[w] = Math.max(dp[w], dp[w - wt[i]] + val[i]);
            }
        }
      `,
    },
    {
      topic: "modular math",
      title: "modpow with bigint",
      code: dedent`
        const power = (b, e, mod) => {
            let res = 1n;
            b %= mod;
            while (e > 0n) {
                if (e & 1n) res = (res * b) % mod;
                b = (b * b) % mod;
                e >>= 1n;
            }
            return res;
        };
      `,
    },
    {
      topic: "typed arrays",
      title: "typed arrays for speed",
      code: dedent`
        const dist = new Int32Array(n).fill(-1);
        const queue = new Int32Array(n);
        let head = 0, tail = 0;
        queue[tail++] = src;
        dist[src] = 0;
      `,
    },
    {
      topic: "topological sort",
      title: "kahn's algorithm",
      code: dedent`
        const queue = [];
        indeg.forEach((d, i) => { if (d === 0) queue.push(i); });
        const order = [];
        for (let head = 0; head < queue.length; head++) {
            const u = queue[head];
            order.push(u);
            for (const v of adj[u]) {
                if (--indeg[v] === 0) queue.push(v);
            }
        }
      `,
    },
    {
      topic: "output",
      title: "batch output",
      code: dedent`
        const out = [];
        for (const x of answers) {
            out.push(String(x));
        }
        process.stdout.write(out.join('\n') + '\n');
      `,
    },
    {
      topic: "bfs",
      title: "0-1 bfs with a deque",
      code: dedent`
        const dist = new Array(n).fill(Infinity);
        const dq = new Int32Array(4 * n);
        let head = 2 * n, tail = 2 * n;
        dist[s] = 0;
        dq[tail++] = s;
        while (head < tail) {
            const u = dq[head++];
            for (const [v, w] of adj[u]) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    if (w === 0) dq[--head] = v;
                    else dq[tail++] = v;
                }
            }
        }
      `,
    },
    {
      topic: "dp",
      title: "edit distance",
      code: dedent`
        const dp = Array.from({ length: a.length + 1 }, (_, i) =>
            Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
        );
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                const sub = dp[i - 1][j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0);
                dp[i][j] = Math.min(sub, dp[i - 1][j] + 1, dp[i][j - 1] + 1);
            }
        }
      `,
    },
    {
      topic: "mst",
      title: "kruskal over sorted edges",
      code: dedent`
        edges.sort((x, y) => x[0] - y[0]);
        let total = 0;
        for (const [w, u, v] of edges) {
            if (union(u, v)) total += w;
        }
        console.log(total);
      `,
    },
    {
      topic: "trees",
      title: "subtree sizes without recursion",
      code: dedent`
        const order = [], parent = new Int32Array(n).fill(-1);
        const stack = [0];
        parent[0] = 0;
        while (stack.length) {
            const u = stack.pop();
            order.push(u);
            for (const v of adj[u]) {
                if (parent[v] === -1) { parent[v] = u; stack.push(v); }
            }
        }
        const sz = new Int32Array(n).fill(1);
        for (let i = n - 1; i > 0; i--) sz[parent[order[i]]] += sz[order[i]];
      `,
    },
    {
      topic: "dp",
      title: "bitmask dp over subsets",
      code: dedent`
        const full = 1 << n;
        const dp = new Array(full).fill(Infinity);
        dp[0] = 0;
        for (let mask = 0; mask < full; mask++) {
            if (dp[mask] === Infinity) continue;
            const i = popcount(mask);
            for (let j = 0; j < n; j++) {
                if (mask & (1 << j)) continue;
                const next = mask | (1 << j);
                dp[next] = Math.min(dp[next], dp[mask] + cost[i][j]);
            }
        }
      `,
    },
    {
      topic: "hashing",
      title: "polynomial rolling hash",
      code: dedent`
        const B = 131n, M = 1000000007n;
        const h = [0n], pw = [1n];
        for (let i = 0; i < s.length; i++) {
            h.push((h[i] * B + BigInt(s.charCodeAt(i))) % M);
            pw.push((pw[i] * B) % M);
        }
        const get = (l, r) => (((h[r] - h[l] * pw[r - l]) % M) + M) % M;
      `,
    },
  ],

  platinum: [
    {
      topic: "segment tree",
      title: "iterative segment tree",
      code: dedent`
        update(i, v) {
            for (this.tree[(i += this.size)] = v; i > 1; i >>= 1) {
                this.tree[i >> 1] = this.tree[i] + this.tree[i ^ 1];
            }
        }
      `,
    },
    {
      topic: "strings",
      title: "z-function",
      code: dedent`
        const zFunction = (s) => {
            const n = s.length;
            const z = new Int32Array(n);
            for (let i = 1, l = 0, r = 0; i < n; i++) {
                if (i < r) z[i] = Math.min(r - i, z[i - l]);
                while (i + z[i] < n && s[z[i]] === s[i + z[i]]) z[i]++;
                if (i + z[i] > r) { l = i; r = i + z[i]; }
            }
            return z;
        };
      `,
    },
    {
      topic: "generators",
      title: "generator over subsets",
      code: dedent`
        function* subsets(mask) {
            for (let sub = mask; ; sub = (sub - 1) & mask) {
                yield sub;
                if (sub === 0) break;
            }
        }
      `,
    },
    {
      topic: "geometry",
      title: "cross product and hull step",
      code: dedent`
        const cross = (o, a, b) =>
            (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

        while (hull.length >= 2 && cross(hull.at(-2), hull.at(-1), p) <= 0) {
            hull.pop();
        }
      `,
    },
    {
      topic: "bitsets",
      title: "bit manipulation",
      code: dedent`
        const lowest = mask & -mask;
        const without = mask & ~(1 << bit);
        const isSet = (mask >> bit) & 1;
        const popcount = (x) => {
            x -= (x >> 1) & 0x55555555;
            x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
            return (((x + (x >> 4)) & 0x0f0f0f0f) * 0x01010101) >> 24;
        };
      `,
    },
    {
      topic: "lca",
      title: "binary lifting",
      code: dedent`
        for (let k = 1; k < LOG; k++) {
            for (let v = 0; v < n; v++) {
                up[k][v] = up[k - 1][up[k - 1][v]];
            }
        }
      `,
    },
    {
      topic: "memoization",
      title: "memoise on a packed key",
      code: dedent`
        const memo = new Map();
        const solve = (i, j) => {
            const key = i * 5000 + j;
            if (memo.has(key)) return memo.get(key);
            const res = Math.min(solve(i - 1, j), solve(i, j - 1)) + cost[i][j];
            memo.set(key, res);
            return res;
        };
      `,
    },
    {
      topic: "matrix",
      title: "matrix multiplication mod p",
      code: dedent`
        const mul = (a, b) =>
            a.map((row) =>
                b[0].map((_, j) =>
                    row.reduce((acc, v, k) => (acc + v * b[k][j]) % MOD, 0)
                )
            );
      `,
    },
    {
      topic: "segment tree",
      title: "lazy range add",
      code: dedent`
        const push = (x) => {
            if (lz[x] !== 0) {
                for (const c of [2 * x, 2 * x + 1]) {
                    t[c] += lz[x];
                    lz[c] += lz[x];
                }
                lz[x] = 0;
            }
        };
      `,
    },
    {
      topic: "scc",
      title: "tarjan's low-link",
      code: dedent`
        const dfs = (u) => {
            idx[u] = low[u] = timer++;
            stack.push(u);
            onStack[u] = 1;
            for (const v of adj[u]) {
                if (idx[v] === -1) {
                    dfs(v);
                    low[u] = Math.min(low[u], low[v]);
                } else if (onStack[v]) {
                    low[u] = Math.min(low[u], idx[v]);
                }
            }
        };
      `,
    },
    {
      topic: "number theory",
      title: "linear sieve",
      code: dedent`
        const lp = new Int32Array(n + 1);
        const primes = [];
        for (let i = 2; i <= n; i++) {
            if (lp[i] === 0) {
                lp[i] = i;
                primes.push(i);
            }
            for (const p of primes) {
                if (p > lp[i] || i * p > n) break;
                lp[i * p] = p;
            }
        }
      `,
    },
    {
      topic: "dsu",
      title: "rollback union-find",
      code: dedent`
        const find = (x) => (par[x] === x ? x : find(par[x]));
        const unite = (a, b) => {
            a = find(a); b = find(b);
            if (a === b) { history.push(null); return false; }
            if (size[a] < size[b]) [a, b] = [b, a];
            par[b] = a;
            size[a] += size[b];
            history.push(b);
            return true;
        };
        const rollback = () => {
            const b = history.pop();
            if (b !== null) { size[par[b]] -= size[b]; par[b] = b; }
        };
      `,
    },
    {
      topic: "sparse table",
      title: "range minimum in O(1)",
      code: dedent`
        const lg = 32 - Math.clz32(n);
        const sp = [Int32Array.from(a)];
        for (let k = 1; k < lg; k++) {
            const prev = sp[k - 1], len = n - (1 << k) + 1;
            const row = new Int32Array(len);
            for (let i = 0; i < len; i++) row[i] = Math.min(prev[i], prev[i + (1 << (k - 1))]);
            sp.push(row);
        }
        const query = (l, r) => {
            const k = 31 - Math.clz32(r - l + 1);
            return Math.min(sp[k][l], sp[k][r - (1 << k) + 1]);
        };
      `,
    },
    {
      topic: "flows",
      title: "dinic level graph",
      code: dedent`
        const bfs = (s, t) => {
            level.fill(-1);
            level[s] = 0;
            const q = [s];
            for (let qi = 0; qi < q.length; qi++) {
                const u = q[qi];
                for (const e of adj[u]) {
                    if (cap[e] > 0 && level[to[e]] < 0) {
                        level[to[e]] = level[u] + 1;
                        q.push(to[e]);
                    }
                }
            }
            return level[t] >= 0;
        };
      `,
    },
  ],
};
