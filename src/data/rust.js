import { dedent } from "./dedent.js";

/**
 * Rust contest patterns. Turbofish, lifetimes, closures and `::` make this the
 * densest symbol workout in the corpus.
 */
export const RUST = {
  bronze: [
    {
      topic: "fast io",
      title: "read a line from stdin",
      code: dedent`
        use std::io::{self, BufRead, Write};

        fn main() {
            let stdin = io::stdin();
            let mut line = String::new();
            stdin.lock().read_line(&mut line).unwrap();
            let n: i64 = line.trim().parse().unwrap();
            println!("{}", n * 2);
        }
      `,
    },
    {
      topic: "arrays",
      title: "parse whitespace-separated ints",
      code: dedent`
        let a: Vec<i64> = line
            .trim()
            .split_whitespace()
            .map(|x| x.parse().unwrap())
            .collect();
      `,
    },
    {
      topic: "arrays",
      title: "sum and maximum",
      code: dedent`
        let total: i64 = a.iter().sum();
        let best = *a.iter().max().unwrap();
        println!("{} {}", total, best);
      `,
    },
    {
      topic: "branching",
      title: "match on ordering",
      code: dedent`
        match a.cmp(&b) {
            Ordering::Less => println!("less"),
            Ordering::Equal => println!("equal"),
            Ordering::Greater => println!("greater"),
        }
      `,
    },
    {
      topic: "strings",
      title: "palindrome check",
      code: dedent`
        fn is_palindrome(s: &str) -> bool {
            let b = s.as_bytes();
            let mut lo = 0usize;
            let mut hi = b.len() - 1;
            while lo < hi {
                if b[lo] != b[hi] {
                    return false;
                }
                lo += 1;
                hi -= 1;
            }
            true
        }
      `,
    },
    {
      topic: "counting",
      title: "frequency with a hashmap",
      code: dedent`
        use std::collections::HashMap;

        let mut freq: HashMap<char, usize> = HashMap::new();
        for ch in s.chars() {
            *freq.entry(ch).or_insert(0) += 1;
        }
      `,
    },
    {
      topic: "grids",
      title: "read a byte grid",
      code: dedent`
        let grid: Vec<Vec<u8>> = (0..r)
            .map(|_| read_line().trim().bytes().collect())
            .collect();
      `,
    },
    {
      topic: "math",
      title: "gcd",
      code: dedent`
        fn gcd(a: u64, b: u64) -> u64 {
            if b == 0 { a } else { gcd(b, a % b) }
        }
      `,
    },
    {
      topic: "fast io",
      title: "buffered writer",
      code: dedent`
        use std::io::{self, Write, BufWriter};

        let out = io::stdout();
        let mut out = BufWriter::new(out.lock());
        for x in &a {
            write!(out, "{} ", x).unwrap();
        }
        writeln!(out).unwrap();
      `,
    },
    {
      topic: "loops",
      title: "count down with rev",
      code: dedent`
        for i in (0..n).rev() {
            if a[i] > best {
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
        let vowels = s
            .chars()
            .filter(|c| "aeiou".contains(*c))
            .count();
        println!("{}", vowels);
      `,
    },
    {
      topic: "math",
      title: "digit sum",
      code: dedent`
        fn digit_sum(mut x: u64) -> u64 {
            let mut s = 0;
            while x > 0 {
                s += x % 10;
                x /= 10;
            }
            s
        }
      `,
    },
    {
      topic: "options",
      title: "max with if let",
      code: dedent`
        if let Some(&m) = a.iter().max() {
            let pos = a.iter().position(|&x| x == m).unwrap();
            println!("{} at {}", m, pos + 1);
        } else {
            println!("empty");
        }
      `,
    },
    {
      topic: "simulation",
      title: "bucket pouring",
      code: dedent`
        let mut cap = [0i64; 3];
        let mut amt = [0i64; 3];
        for step in 0..100 {
            let (from, to) = (step % 3, (step + 1) % 3);
            let pour = amt[from].min(cap[to] - amt[to]);
            amt[from] -= pour;
            amt[to] += pour;
        }
      `,
    },
  ],

  silver: [
    {
      topic: "sorting",
      title: "sort by key with a tiebreak",
      code: dedent`
        items.sort_by(|x, y| {
            x.weight.cmp(&y.weight).then(y.value.cmp(&x.value))
        });
      `,
    },
    {
      topic: "binary search",
      title: "partition point",
      code: dedent`
        let idx = a.partition_point(|&x| x < target);
        if idx < a.len() && a[idx] == target {
            println!("found at {}", idx);
        }
      `,
    },
    {
      topic: "two pointers",
      title: "pair summing to target",
      code: dedent`
        let (mut lo, mut hi) = (0usize, n - 1);
        while lo < hi {
            let sum = a[lo] + a[hi];
            if sum == target {
                break;
            } else if sum < target {
                lo += 1;
            } else {
                hi -= 1;
            }
        }
      `,
    },
    {
      topic: "prefix sums",
      title: "scan into prefix sums",
      code: dedent`
        let mut pre = vec![0i64; n + 1];
        for i in 0..n {
            pre[i + 1] = pre[i] + a[i];
        }
        let range_sum = pre[r + 1] - pre[l];
      `,
    },
    {
      topic: "bfs",
      title: "flood fill on a grid",
      code: dedent`
        let mut q = VecDeque::new();
        q.push_back((sr, sc));
        seen[sr][sc] = true;
        while let Some((r, c)) = q.pop_front() {
            for (dr, dc) in [(0i32, 1i32), (0, -1), (1, 0), (-1, 0)] {
                let (nr, nc) = (r as i32 + dr, c as i32 + dc);
                if nr < 0 || nc < 0 { continue; }
                let (nr, nc) = (nr as usize, nc as usize);
                if nr >= rows || nc >= cols || seen[nr][nc] { continue; }
                seen[nr][nc] = true;
                q.push_back((nr, nc));
            }
        }
      `,
    },
    {
      topic: "graphs",
      title: "build an adjacency list",
      code: dedent`
        let mut adj: Vec<Vec<usize>> = vec![Vec::new(); n + 1];
        for _ in 0..m {
            let (u, v) = read_pair();
            adj[u].push(v);
            adj[v].push(u);
        }
      `,
    },
    {
      topic: "greedy",
      title: "interval scheduling",
      code: dedent`
        iv.sort_by_key(|&(_, end)| end);
        let mut taken = 0;
        let mut last_end = i64::MIN;
        for &(start, end) in &iv {
            if start >= last_end {
                taken += 1;
                last_end = end;
            }
        }
      `,
    },
    {
      topic: "compression",
      title: "coordinate compression",
      code: dedent`
        let mut vals = a.clone();
        vals.sort_unstable();
        vals.dedup();
        let ranked: Vec<usize> = a
            .iter()
            .map(|x| vals.binary_search(x).unwrap())
            .collect();
      `,
    },
    {
      topic: "prefix sums",
      title: "2D prefix sums",
      code: dedent`
        let mut p = vec![vec![0i64; m + 1]; n + 1];
        for i in 0..n {
            for j in 0..m {
                p[i + 1][j + 1] = g[i][j] + p[i][j + 1] + p[i + 1][j] - p[i][j];
            }
        }
        let rect = |r1: usize, c1: usize, r2: usize, c2: usize| {
            p[r2][c2] - p[r1][c2] - p[r2][c1] + p[r1][c1]
        };
      `,
    },
    {
      topic: "binary search",
      title: "binary search on the answer",
      code: dedent`
        let (mut lo, mut hi) = (0i64, 2_000_000_000);
        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if feasible(mid) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        println!("{}", lo);
      `,
    },
    {
      topic: "dfs",
      title: "iterative dfs with a stack",
      code: dedent`
        let mut seen = vec![false; n];
        let mut stack = vec![0usize];
        seen[0] = true;
        while let Some(u) = stack.pop() {
            for &v in &adj[u] {
                if !seen[v] {
                    seen[v] = true;
                    stack.push(v);
                }
            }
        }
      `,
    },
    {
      topic: "sorting",
      title: "sort and dedup",
      code: dedent`
        let mut xs: Vec<i64> = input.clone();
        xs.sort_unstable();
        xs.dedup();
        let rank = |v: i64| xs.binary_search(&v).unwrap();
      `,
    },
    {
      topic: "sliding window",
      title: "longest window under a budget",
      code: dedent`
        let (mut l, mut sum, mut best) = (0, 0i64, 0);
        for r in 0..n {
            sum += a[r];
            while sum > k {
                sum -= a[l];
                l += 1;
            }
            best = best.max(r + 1 - l);
        }
      `,
    },
    {
      topic: "sets",
      title: "btreeset neighbours",
      code: dedent`
        use std::collections::BTreeSet;

        let mut set: BTreeSet<i64> = BTreeSet::new();
        for &x in &a {
            let lo = set.range(..x).next_back();
            let hi = set.range(x..).next();
            if let (Some(&p), Some(&q)) = (lo, hi) {
                gap = gap.min(q - p);
            }
            set.insert(x);
        }
      `,
    },
  ],

  gold: [
    {
      topic: "shortest paths",
      title: "dijkstra with a reversed heap",
      code: dedent`
        use std::collections::BinaryHeap;
        use std::cmp::Reverse;

        let mut dist = vec![u64::MAX; n];
        let mut pq = BinaryHeap::new();
        dist[src] = 0;
        pq.push(Reverse((0u64, src)));
        while let Some(Reverse((d, u))) = pq.pop() {
            if d > dist[u] { continue; }
            for &(v, w) in &adj[u] {
                if d + w < dist[v] {
                    dist[v] = d + w;
                    pq.push(Reverse((dist[v], v)));
                }
            }
        }
      `,
    },
    {
      topic: "dsu",
      title: "union-find",
      code: dedent`
        struct Dsu {
            par: Vec<usize>,
            sz: Vec<usize>,
        }

        impl Dsu {
            fn new(n: usize) -> Self {
                Dsu { par: (0..n).collect(), sz: vec![1; n] }
            }
            fn find(&mut self, x: usize) -> usize {
                if self.par[x] != x {
                    self.par[x] = self.find(self.par[x]);
                }
                self.par[x]
            }
        }
      `,
    },
    {
      topic: "dp",
      title: "0/1 knapsack",
      code: dedent`
        let mut dp = vec![0i64; cap + 1];
        for i in 0..n {
            for w in (wt[i]..=cap).rev() {
                dp[w] = dp[w].max(dp[w - wt[i]] + val[i]);
            }
        }
      `,
    },
    {
      topic: "dp",
      title: "longest increasing subsequence",
      code: dedent`
        let mut tails: Vec<i64> = Vec::new();
        for &x in &a {
            match tails.binary_search(&x) {
                Ok(_) => {}
                Err(pos) if pos == tails.len() => tails.push(x),
                Err(pos) => tails[pos] = x,
            }
        }
      `,
    },
    {
      topic: "modular math",
      title: "modpow",
      code: dedent`
        fn power(mut b: u64, mut e: u64, m: u64) -> u64 {
            let mut res = 1u64;
            b %= m;
            while e > 0 {
                if e & 1 == 1 { res = res * b % m; }
                b = b * b % m;
                e >>= 1;
            }
            res
        }
      `,
    },
    {
      topic: "topological sort",
      title: "kahn's algorithm",
      code: dedent`
        let mut q: VecDeque<usize> = (0..n).filter(|&i| indeg[i] == 0).collect();
        let mut order = Vec::with_capacity(n);
        while let Some(u) = q.pop_front() {
            order.push(u);
            for &v in &adj[u] {
                indeg[v] -= 1;
                if indeg[v] == 0 { q.push_back(v); }
            }
        }
      `,
    },
    {
      topic: "fenwick",
      title: "binary indexed tree",
      code: dedent`
        impl Bit {
            fn add(&mut self, mut i: usize, v: i64) {
                while i < self.t.len() {
                    self.t[i] += v;
                    i += i & i.wrapping_neg();
                }
            }
            fn query(&self, mut i: usize) -> i64 {
                let mut s = 0;
                while i > 0 {
                    s += self.t[i];
                    i -= i & i.wrapping_neg();
                }
                s
            }
        }
      `,
    },
    {
      topic: "iterators",
      title: "windows and chunks",
      code: dedent`
        let best = a
            .windows(k)
            .map(|w| w.iter().sum::<i64>())
            .max()
            .unwrap_or(0);
      `,
    },
    {
      topic: "bfs",
      title: "0-1 bfs with a deque",
      code: dedent`
        use std::collections::VecDeque;

        let mut dist = vec![usize::MAX; n];
        let mut dq = VecDeque::new();
        dist[s] = 0;
        dq.push_back(s);
        while let Some(u) = dq.pop_front() {
            for &(v, w) in &adj[u] {
                if dist[u] + w < dist[v] {
                    dist[v] = dist[u] + w;
                    if w == 0 { dq.push_front(v) } else { dq.push_back(v) }
                }
            }
        }
      `,
    },
    {
      topic: "dp",
      title: "edit distance",
      code: dedent`
        let (a, b) = (a.as_bytes(), b.as_bytes());
        let mut dp = vec![vec![0usize; b.len() + 1]; a.len() + 1];
        for i in 0..=a.len() { dp[i][0] = i; }
        for j in 0..=b.len() { dp[0][j] = j; }
        for i in 1..=a.len() {
            for j in 1..=b.len() {
                let sub = dp[i - 1][j - 1] + (a[i - 1] != b[j - 1]) as usize;
                dp[i][j] = sub.min(dp[i - 1][j] + 1).min(dp[i][j - 1] + 1);
            }
        }
      `,
    },
    {
      topic: "mst",
      title: "kruskal over sorted edges",
      code: dedent`
        edges.sort_by_key(|&(w, _, _)| w);
        let mut dsu = Dsu::new(n);
        let mut total = 0i64;
        for &(w, u, v) in &edges {
            if dsu.union(u, v) {
                total += w;
            }
        }
        println!("{}", total);
      `,
    },
    {
      topic: "trees",
      title: "subtree sizes",
      code: dedent`
        fn dfs(u: usize, p: usize, adj: &[Vec<usize>], sz: &mut [usize]) {
            sz[u] = 1;
            for &v in &adj[u] {
                if v != p {
                    dfs(v, u, adj, sz);
                    sz[u] += sz[v];
                }
            }
        }
      `,
    },
    {
      topic: "dp",
      title: "bitmask dp over subsets",
      code: dedent`
        let full = 1usize << n;
        let mut dp = vec![i64::MAX; full];
        dp[0] = 0;
        for mask in 0..full {
            if dp[mask] == i64::MAX { continue; }
            let i = mask.count_ones() as usize;
            for j in 0..n {
                if mask & (1 << j) == 0 {
                    let next = mask | (1 << j);
                    dp[next] = dp[next].min(dp[mask] + cost[i][j]);
                }
            }
        }
      `,
    },
    {
      topic: "hashing",
      title: "polynomial rolling hash",
      code: dedent`
        const B: u64 = 131;
        const M: u64 = 1_000_000_007;
        let mut h = vec![0u64; n + 1];
        let mut pw = vec![1u64; n + 1];
        for (i, &c) in s.as_bytes().iter().enumerate() {
            h[i + 1] = (h[i] * B + c as u64) % M;
            pw[i + 1] = pw[i] * B % M;
        }
        let get = |l: usize, r: usize| (h[r] + M - h[l] * pw[r - l] % M) % M;
      `,
    },
  ],

  platinum: [
    {
      topic: "segment tree",
      title: "iterative segment tree",
      code: dedent`
        impl SegTree {
            fn update(&mut self, mut i: usize, v: i64) {
                i += self.size;
                self.tree[i] = v;
                while i > 1 {
                    i >>= 1;
                    self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1];
                }
            }
        }
      `,
    },
    {
      topic: "traits",
      title: "generic monoid segment tree",
      code: dedent`
        trait Monoid {
            type T: Clone;
            fn identity() -> Self::T;
            fn combine(a: &Self::T, b: &Self::T) -> Self::T;
        }

        struct SegTree<M: Monoid> {
            size: usize,
            tree: Vec<M::T>,
        }
      `,
    },
    {
      topic: "strings",
      title: "z-function",
      code: dedent`
        fn z_function(s: &[u8]) -> Vec<usize> {
            let n = s.len();
            let mut z = vec![0usize; n];
            let (mut l, mut r) = (0usize, 0usize);
            for i in 1..n {
                if i < r { z[i] = (r - i).min(z[i - l]); }
                while i + z[i] < n && s[z[i]] == s[i + z[i]] { z[i] += 1; }
                if i + z[i] > r { l = i; r = i + z[i]; }
            }
            z
        }
      `,
    },
    {
      topic: "geometry",
      title: "cross product and hull step",
      code: dedent`
        fn cross(o: (i64, i64), a: (i64, i64), b: (i64, i64)) -> i64 {
            (a.0 - o.0) * (b.1 - o.1) - (a.1 - o.1) * (b.0 - o.0)
        }

        while hull.len() >= 2 && cross(hull[hull.len() - 2], hull[hull.len() - 1], p) <= 0 {
            hull.pop();
        }
      `,
    },
    {
      topic: "lca",
      title: "binary lifting",
      code: dedent`
        for k in 1..LOG {
            for v in 0..n {
                up[k][v] = up[k - 1][up[k - 1][v]];
            }
        }
      `,
    },
    {
      topic: "bitsets",
      title: "bit tricks",
      code: dedent`
        let lowest = mask & mask.wrapping_neg();
        let popcount = mask.count_ones();
        let without = mask & !(1u64 << bit);
        let subsets = std::iter::successors(Some(mask), |&s| {
            if s == 0 { None } else { Some((s - 1) & mask) }
        });
      `,
    },
    {
      topic: "matrix",
      title: "matrix multiplication mod p",
      code: dedent`
        fn mul(a: &[[u64; N]; N], b: &[[u64; N]; N]) -> [[u64; N]; N] {
            let mut c = [[0u64; N]; N];
            for i in 0..N {
                for k in 0..N {
                    if a[i][k] == 0 { continue; }
                    for j in 0..N {
                        c[i][j] = (c[i][j] + a[i][k] * b[k][j]) % MOD;
                    }
                }
            }
            c
        }
      `,
    },
    {
      topic: "flows",
      title: "edge list with paired reverses",
      code: dedent`
        fn add_edge(&mut self, u: usize, v: usize, cap: i64) {
            self.adj[u].push(self.edges.len());
            self.edges.push(Edge { to: v, cap });
            self.adj[v].push(self.edges.len());
            self.edges.push(Edge { to: u, cap: 0 });
        }
      `,
    },
    {
      topic: "segment tree",
      title: "lazy range add",
      code: dedent`
        fn push(&mut self, x: usize) {
            if self.lz[x] != 0 {
                for c in [2 * x, 2 * x + 1] {
                    self.t[c] += self.lz[x];
                    self.lz[c] += self.lz[x];
                }
                self.lz[x] = 0;
            }
        }
      `,
    },
    {
      topic: "scc",
      title: "tarjan's low-link",
      code: dedent`
        fn dfs(&mut self, u: usize) {
            self.idx[u] = self.timer;
            self.low[u] = self.timer;
            self.timer += 1;
            self.stack.push(u);
            self.on[u] = true;
            for i in 0..self.adj[u].len() {
                let v = self.adj[u][i];
                if self.idx[v] == usize::MAX {
                    self.dfs(v);
                    self.low[u] = self.low[u].min(self.low[v]);
                } else if self.on[v] {
                    self.low[u] = self.low[u].min(self.idx[v]);
                }
            }
        }
      `,
    },
    {
      topic: "number theory",
      title: "linear sieve",
      code: dedent`
        let mut lp = vec![0usize; n + 1];
        let mut primes: Vec<usize> = Vec::new();
        for i in 2..=n {
            if lp[i] == 0 {
                lp[i] = i;
                primes.push(i);
            }
            for &p in &primes {
                if p > lp[i] || i * p > n { break; }
                lp[i * p] = p;
            }
        }
      `,
    },
    {
      topic: "flows",
      title: "dinic level graph",
      code: dedent`
        fn bfs(&mut self, s: usize, t: usize) -> bool {
            self.level.iter_mut().for_each(|l| *l = -1);
            self.level[s] = 0;
            let mut q = std::collections::VecDeque::from([s]);
            while let Some(u) = q.pop_front() {
                for &e in &self.adj[u] {
                    let Edge { to, cap } = self.edges[e];
                    if cap > 0 && self.level[to] < 0 {
                        self.level[to] = self.level[u] + 1;
                        q.push_back(to);
                    }
                }
            }
            self.level[t] >= 0
        }
      `,
    },
    {
      topic: "geometry",
      title: "monotone chain hull",
      code: dedent`
        pts.sort();
        let mut hull: Vec<(i64, i64)> = Vec::new();
        for pass in 0..2 {
            let start = hull.len();
            for &p in &pts {
                while hull.len() >= start + 2
                    && cross(hull[hull.len() - 2], hull[hull.len() - 1], p) <= 0
                {
                    hull.pop();
                }
                hull.push(p);
            }
            hull.pop();
            if pass == 0 { pts.reverse(); }
        }
      `,
    },
    {
      topic: "sparse table",
      title: "range minimum in O(1)",
      code: dedent`
        let lg = (usize::BITS - n.leading_zeros()) as usize;
        let mut sp = vec![a.clone()];
        for k in 1..lg {
            let prev = &sp[k - 1];
            let row: Vec<i64> = (0..=n - (1 << k))
                .map(|i| prev[i].min(prev[i + (1 << (k - 1))]))
                .collect();
            sp.push(row);
        }
      `,
    },
  ],
};
