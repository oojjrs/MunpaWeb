# MunpaWeb Handoff

This file preserves the project context for future Codex threads.

## Repository

- Local workspace: `E:\MunpaWeb`
- GitHub repository: `https://github.com/oojjrs/MunpaWeb`
- GitHub Pages URL: `https://oojjrs.github.io/MunpaWeb/`
- Default branch: `main`
- Visibility: public

## Current State

- The repository was initialized from an empty GitHub repository.
- `.gitignore` was committed and pushed first.
- A static, browser-only game shell was added and pushed.
- GitHub Pages is configured to deploy via GitHub Actions.
- The deployed site has been verified to return HTTP 200 at the Pages URL.

## Existing Commits

- `1863c18 Add initial gitignore`
- `3e181a5 Add GitHub Pages game shell`

## Files Added For The Static Game Shell

- `.github/workflows/pages.yml`: GitHub Actions workflow for Pages deployment.
- `.nojekyll`: Disables Jekyll processing for GitHub Pages.
- `README.md`: Basic project and deployment notes.
- `index.html`: Static app entry point.
- `styles.css`: Responsive base UI styles.
- `src/app.js`: Canvas loop, IndexedDB save/load, localStorage timestamp, service worker registration.
- `sw.js`: Service worker for app shell caching.
- `manifest.webmanifest`: PWA metadata.

## Deployment Notes

GitHub Pages should use:

- Source: GitHub Actions
- Workflow: `Deploy GitHub Pages`

Expected published URL:

`https://oojjrs.github.io/MunpaWeb/`

If the workflow fails after changes, check the Actions tab for the `Deploy GitHub Pages` run. The Pages setup currently assumes a static site served from the repository root.

## Development Direction

The project goal is a serverless, browser-playable web game that can be shared publicly through GitHub Pages.

Preferred technical direction:

- Static frontend first.
- Keep the game playable from GitHub Pages without a backend.
- Use client-side persistence.
- Use `IndexedDB` for larger game save data.
- Use `localStorage` for small preferences or last-save metadata.
- Use Service Worker + Cache Storage for offline/app-shell caching.

## Collaboration Rules

- Commit at suitable milestones, not after every tiny edit.
- Implement features first, then let the user test locally or on Pages.
- Commit and push only after the user gives an explicit OK.
- Do not overwrite user changes.
- Keep the app static unless the user explicitly chooses a server/backend.
- Prefer simple browser-native technology until the game requirements justify adding a build system.

## Local Verification

Opening `index.html` directly in a browser works for a quick visual check.

Service worker caching is only meaningful on HTTPS or localhost, so verify offline/PWA behavior on GitHub Pages or via a local static server.

## Known Notes

- The local Git author was auto-detected as `oojjrs <oojjrs@nexon.co.kr>` when commits were created.
- `node --check src/app.js` could not be run in this environment because `node.exe` returned `Access is denied`.
- GitHub connector access was confirmed in this thread for account `oojjrs` with admin/push permissions on `oojjrs/MunpaWeb`.
