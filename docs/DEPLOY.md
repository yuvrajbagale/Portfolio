# Deployment and CI/CD Setup

This project now includes two CI/CD workflows:

- `.github/workflows/gh-pages.yml` — builds the Angular app and publishes the compiled `dist` folder to the `gh-pages` branch using `peaceiris/actions-gh-pages`.
- `.github/workflows/vercel-deploy.yml` — builds and deploys the production bundle to Vercel using the Vercel CLI.

What you must provide
- `VERCEL_TOKEN` (GitHub secret) — a Vercel Personal Token with Deploy permissions. Add it at: `Settings → Secrets and variables → Actions → New repository secret`. Name it `VERCEL_TOKEN`.
- Optional: `VERCEL_SCOPE` and `VERCEL_PROJECT_NAME` if you need to scope the deploy to a specific team or use a specific Vercel project name. These are optional and can also be added as repository secrets.

Notes about GitHub Pages
- The `gh-pages` workflow auto-detects `outputPath` from `angular.json` and falls back to `dist/<project>` or `dist`.
- For project pages (the default when your repo is not a `*.github.io` repo), the workflow sets `--base-href=/REPO_NAME/` so your app URLs work correctly.
- For user/org sites (a repository named like `username.github.io` or `org.github.io`), the base-href used is `/`.

SPA fallback (GitHub Pages)
- GitHub Pages does not natively support SPA fallback for client-side routing. Two common options:
  1. Use HashLocationStrategy in Angular so routes are served under `index.html` (no server config needed).
  2. Add a `404.html` that redirects to `index.html` or serves the app shell. You can create a `404.html` copy of your `index.html` in the deploy output and the workflow will publish it.

Notes about Vercel
- Vercel handles SPA fallback for you by default.
- The Vercel workflow will fail early with a clear message if `VERCEL_TOKEN` is not configured.

Manual triggers and troubleshooting
- To run workflows manually from GitHub: go to the repository → Actions → choose the workflow → "Run workflow" (if you want to run on main).
- Workflow logs: Actions → select workflow run → expand steps to see output.
- Rollback: delete the `gh-pages` branch or revert the commit on `main` that triggered the deployment.

Files added or changed by this automation
- `.github/workflows/gh-pages.yml`
- `.github/workflows/vercel-deploy.yml`
- `docs/DEPLOY.md`

Placeholders you'll need to check
- If your Vercel project is under a scope/team different from the GitHub owner, set `VERCEL_SCOPE` secret.
- If you want to ensure the Vercel project name matches, set `VERCEL_PROJECT_NAME` secret.

Local testing and base-href
- To test base-href locally: `npx ng build --configuration production --base-href "/YOUR_REPO_NAME/"`.
- To serve locally the built files to check routing, you can use a static server: `npx http-server dist/<project>` (install `http-server` if needed).

If any of the required files were missing, this automation would have created minimal placeholders and would have marked them in the files. Please review the commit/PR for any placeholder values.
