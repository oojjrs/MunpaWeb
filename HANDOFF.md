# MunpaWeb Handoff

This file preserves the project context for future Codex threads.

## Repository

- Local workspace: `H:\MunpaWeb` (home setup, 2026-06-11)
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
- Treat this file as the project's own portable memory. Because work may move between locations or machines, keep project-specific context here and commit it with the repository instead of relying on shared/global Codex memory.

## Active UI Guidelines

- Treat the app as a browser SPA: every user-visible screen transition must update `history.pushState` or `history.replaceState`, and `popstate` must restore the appropriate screen. Do not rely on visible in-app back buttons for normal navigation.
- Do not leave transient setup screens behind completed flows in browser history. When a setup step creates or commits a save, replace the setup history entry with the resulting game screen so Back returns to the prior stable screen.
- Keep destructive or save-reset actions away from high-frequency bottom menu areas. Use clear confirmation before clearing save data.
- Korean text must avoid awkward one-character orphan lines. Prefer shorter copy, `word-break: keep-all`, `overflow-wrap: break-word`, and balanced/pretty wrapping where supported.
- Avoid Korean particle bugs by choosing UI copy that does not require runtime `은/는`, `이/가`, or `을/를` selection. Do not display fallback forms like `은(는)` or `이(가)`.
- Fixed-format visual choices such as portraits must use stable square dimensions. Do not allow labels, hover states, or image loading to resize the selection grid.
- Icon-only controls must be visually centered, have accessible labels/tooltips, and use familiar symbols instead of text when the action is compact or repeated.
- Primary mobile actions that complete a step, such as character creation confirmation, should span the available form width for left- and right-handed reach.
- On mobile, assume the player's thumb is near the bottom of the screen. Place high-frequency action groups and final step controls near the bottom of the active panel, with scrollable content above them.
- Mobile layouts must fit the visible viewport without document-level scrolling. Use `dvh/svh` viewport units and keep scrolling inside intentional internal panes only.
- Large desktop layouts use a fixed `1920x1080` desktop stage that scales to the browser viewport. Keep only two layout families: desktop stage scaling and the small mobile layout. Do not keep adding many browser-width-specific responsive variants unless a real workflow needs them.
- Desktop setup/form screens should keep a compact mobile-like ratio instead of stretching fields across the whole desktop stage. Keep founder creation around the portrait preview width so name inputs and primary actions do not become long horizontal bars.
- Desktop modal/panel windows should be sized in the fixed stage, then scaled with the stage. Founder/detail panels use about `900px` logical width, recruitment panels about `1040px`, and cheat panels about `760px` so they do not look tiny on 4K monitors.
- Runtime player portrait assets currently use the modern K/N character images under `assets/style-exploration/characters/`; disciple portrait assets stay under `assets/portraits/disciples/`.
- Founder/player name pools should follow the selected portrait group. When the founder portrait changes, refresh the random name from that portrait's pool only if the player has not manually edited the name field.
- Founder/player portraits no longer depend on removed legacy age variants. If a portrait has `ageImages`, preview them; otherwise show only the start portrait.
- Founder creation should preview the selected portrait without turning the whole picker into a gallery. Keep the selector order fixed and keep the preview cards stable if age variants return later.
- Service worker updates should be user-friendly on mobile: use network-first fetch for app files and auto-activate/reload once per app version when a new worker takes control.
- One-way information that the player cannot act on should be visually quiet, such as muted/dimmed text or lower-emphasis placement, while remaining comfortably readable.
- Interactive objects must be visually distinct from non-interactive information. Buttons, selectable options, and tappable controls need clear borders, contrast, hover/focus/pressed states, and cursor affordance.
- Maintain a semantic color set with light/dark variants. Use tokens for surface, text, muted text, border, action, action hover, panel, and menu colors instead of scattering raw colors across UI rules.

## Local Verification

Opening `index.html` directly in a browser works for a quick visual check.

Service worker caching is only meaningful on HTTPS or localhost, so verify offline/PWA behavior on GitHub Pages or via a local static server.

## Home Setup Notes

- 2026-06-11 기준 집 환경의 로컬 작업 경로는 `H:\MunpaWeb`이다. 예전 handoff에 남아 있던 `E:\MunpaWeb`는 회사/이전 환경 경로로 취급한다.
- 기본 `node.exe`는 이 환경에서 `Access is denied`로 실행되지 않는다. JS 문법 검사는 Codex 번들 Node인 `C:\Users\oojjr\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe`로 `--check src\app.js`, `--check sw.js`를 실행하면 된다.
- tracked 텍스트 파일은 UTF-8 No-BOM + CRLF로 확인했다. PowerShell `Get-Content` 출력에서 한글이 깨져 보여도 실제 파일이 깨졌다고 단정하지 말고 `rg`, 명시적 UTF-8 읽기, 또는 번들 Node로 확인한다.
- `src/app.js`의 `APP_VERSION`과 `sw.js`의 `CACHE_NAME`은 서비스워커 캐시 갱신 시 함께 맞춘다. 현재 확인 기준 값은 `v80` / `munpaweb-shell-v80`이다.
- `assets/portraits/disciples/`에는 런타임에서 아직 참조하지 않는 추가 초상화/연령대 폴더가 있을 수 있다. 제자 초상화 로직을 바꿀 때는 `src/app.js`의 `disciplePortraitGroups`와 `sw.js`의 app shell 목록을 함께 확인한다.

## Known Notes

- The local Git author was auto-detected as `oojjrs <oojjrs@nexon.co.kr>` when commits were created.
- Default `node --check src/app.js` could not be run in the previous environment because `node.exe` returned `Access is denied`; use the bundled Node path from the Home Setup Notes when needed.
- GitHub connector access was confirmed in this thread for account `oojjrs` with admin/push permissions on `oojjrs/MunpaWeb`.
