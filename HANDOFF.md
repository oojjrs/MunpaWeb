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
- Before UI/layout work, reread the Active UI Guidelines below and keep them consistent across screens.

## Active UI Guidelines

- Treat the app as a browser SPA: every user-visible screen transition must update `history.pushState` or `history.replaceState`, and `popstate` must restore the appropriate screen. Do not rely on visible in-app back buttons for normal navigation.
- Do not leave transient setup screens behind completed flows in browser history. When a setup step creates or commits a save, replace the setup history entry with the resulting game screen so Back returns to the prior stable screen.
- Keep destructive or save-reset actions away from high-frequency bottom menu areas. Use clear confirmation before clearing save data.
- Korean text must avoid awkward one-character orphan lines. Prefer shorter copy, `word-break: keep-all`, `overflow-wrap: break-word`, and balanced/pretty wrapping where supported.
- Avoid Korean particle bugs by choosing UI copy that does not require runtime `은/는`, `이/가`, or `을/를` selection. Do not display fallback forms like `은(는)` or `이(가)`.
- Fixed-format visual choices such as portraits must use stable square dimensions. Do not allow labels, hover states, or image loading to resize the selection grid.
- Icon-only controls must be visually centered, have accessible labels/tooltips, and use familiar symbols instead of text when the action is compact or repeated.
- Primary mobile actions that complete a step, such as character creation confirmation, should span the available form width for left- and right-handed reach.
- Mobile layouts must fit the visible viewport without document-level scrolling. Use `dvh/svh` viewport units and keep scrolling inside intentional internal panes only.
- Founder/player portrait assets live under `assets/portraits/founders/`; disciple portrait assets should use a separate portrait subfolder.

## Local Verification

Opening `index.html` directly in a browser works for a quick visual check.

Service worker caching is only meaningful on HTTPS or localhost, so verify offline/PWA behavior on GitHub Pages or via a local static server.

## Known Notes

- The local Git author was auto-detected as `oojjrs <oojjrs@nexon.co.kr>` when commits were created.
- `node --check src/app.js` could not be run in this environment because `node.exe` returned `Access is denied`.
- GitHub connector access was confirmed in this thread for account `oojjrs` with admin/push permissions on `oojjrs/MunpaWeb`.
