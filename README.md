# CodeTypey

A typing trainer for programming syntax (C++, Java, Python), built with React + Vite.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Deploying to GitHub Pages

**1. Push this project to a GitHub repo** (root of the repo, not inside a subfolder):

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

**2. Turn on Pages via GitHub Actions**
In your repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

That's it — the included workflow (`.github/workflows/deploy.yml`) will build the
project and deploy it automatically on every push to `main`. Check the **Actions**
tab for progress; once it finishes, your site is live at:

```
https://<your-username>.github.io/<your-repo>/
```

(or `https://<your-username>.github.io/` if this is a `<username>.github.io` repo).

## Manual build (optional)

```bash
npm run build
```

Outputs static files to `dist/`, which you can also deploy by hand (e.g. to the
`gh-pages` branch) if you'd rather not use the Actions workflow.
