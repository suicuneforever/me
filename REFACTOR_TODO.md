# Refactor To-Do (Interview Readiness)

Audit performed 2026-08-10. Organized by priority — tackle Tier 1 first, it's the highest-visibility/lowest-effort work.

## Tier 1 — Quick wins, high visibility

- [x] Fix broken lint setup: `eslint.config.js` uses the flat-config `eslint/config` import (ESLint v9+ API) but `package.json` pins `eslint@^8.57.1`. Either upgrade to ESLint 9 or rewrite `eslint.config.js` for v8. Also fix the `lint` script in `package.json:9` — `--ext ts,tsx` isn't valid with flat config.
- [x] Replace `README.md` (still the default Vite template) with a real description: what the site is, tech stack, screenshots, setup/run instructions.
- [x] Rename `package.json` `name`/`version` (currently `"react-template"` / `"0.0.0"`).
- [x] Fix `index.html`: descriptive `<title>` (currently just "me"), add `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`), and a favicon (none exists currently).
- [x] Remove `console.log(data)` in `src/components/Steam/Steam.tsx:28`.
- [x] Remove dead/commented-out code: `App.tsx:1-4,11-19`, `main.tsx:40`, `Steam.tsx:4`, `models/Computa.tsx:26,32-33,80`, `Desktop.tsx:27,29`.
- [x] Untrack `.DS_Store` from git (`git rm --cached .DS_Store`) and add `.DS_Store` / `**/.DS_Store` to `.gitignore`.
- [x] Fix missing `public/images/underconstruction.gif` — referenced by 6 AboutMe sections (`AboutMe.tsx:133,139,145,151,157,163`) but the file doesn't exist, so those tabs render broken images.
- [ ] Add favicon and `og:image`.

## Tier 2 — Structural / component design

- [x] Extract a reusable `<FormField>` component in `ContactMe.tsx` — the label+input+error block is copy-pasted 3–4 times (`ContactMe.tsx:91-119, 120-148, 149-171, 173-201`).
- [ ] Extract a shared `<SectionHeader title="..." />` for the repeated title+divider pattern in `AboutMe.tsx`, `Steam.tsx`, `ContactMe.tsx`.
- [ ] Refactor `AboutMe.tsx:102-170` — 8 near-identical `sectionId === 'X' ? (...) : null` branches, 6 of which render the same placeholder markup. Drive this from a data lookup instead of copy-pasted JSX.
- [ ] Make `WindowModal.tsx` generic — it special-cases `windowData.id === 'CONTACT_ME'` (`:31,78-79,96-97,119-128`) to control sizing/layout. Pass `size`/`variant` as a prop from `Desktop.tsx`'s config instead.
- [ ] Data-drive the Email/Links tabs in `ContactMe.tsx:55-70` (currently two near-identical hardcoded divs) similar to how `DESKTOP_ICONS` already works.
- [ ] Extract hardcoded API base URL (`src/api/api.ts:5,19`) into a single constant, ideally `import.meta.env.VITE_API_BASE_URL`. Add a `.env.example`.
- [ ] Hoist `WINDOW_COMPONENTS` in `Desktop.tsx:32-39` out of the component body (it's recreated every render, and `Desktop` re-renders every second — see Tier 3).
- [ ] Decide the fate of `src/models/Computa.tsx` (unused 3D computer feature, fully commented out in `App.tsx`) — finish and wire it up, or delete it along with `three`/`@react-three/fiber`/`@react-three/drei` deps and `.glb` assets to cut bundle size.
- [ ] Resolve/remove `MySpace` and `Mystery` stub components (5-line placeholders, commented out of `DESKTOP_ICONS` but still wired into `WINDOW_COMPONENTS`) — finish or remove.

## Tier 3 — TypeScript & code quality

- [ ] Remove remaining `any` usages:
  - `src/models/Computa.tsx:21` — `{ props }: any`
  - `src/api/api.ts:8` — `.map((game: any) => ...)`
  - `src/components/ContactMe/ContactMe.tsx:111,140,193` — `(error: any)` repeated 3x
- [ ] Move `Email` type (`ContactMe.tsx:9-14`) and `Section` type (`AboutMe.tsx:26-30`) into `src/types/types.ts` — both are currently defined inside component files and imported cross-component (`GlitchButton.tsx:4` imports `Section` from `AboutMe`), which creates awkward coupling. Both already have `// TODO` comments flagging this.
- [ ] Rename `Window` interface in `src/store/store.ts:8-12` (e.g. to `DesktopWindow`) — it shadows the global DOM `Window` type, and gets destructured as a loop variable literally named `window` in `Desktop.tsx:75,83`, shadowing `globalThis.window`.
- [ ] Fix `useRef<THREE.Mesh>()` in `Computa.tsx:25` — missing initial value, inconsistent with the `useRef<T | null>(null)` pattern used elsewhere.
- [ ] Add `manualChunks`/bundle review in `vite.config.ts` once the Computa/3D question is resolved; also remove the unused `tanstackRouter` import in `vite.config.ts:3` (imported but never added to `plugins`).
- [ ] Fix remaining `npm run lint` errors now that the lint setup works (40 total, grouped by rule):
  - `react/no-unescaped-entities` — unescaped `'` in `AboutMe.tsx:120` and `Resume.tsx:158`.
  - `react/no-children-prop` — `ContactMe.tsx:94,123,152,176,204` pass `children` as a prop instead of nesting JSX.
  - `react/jsx-no-target-blank` — `ContactMe.tsx:221,224` use `target="_blank"` without `rel="noreferrer"`.
  - `prefer-const` — `GlitchButton.tsx:19` (`chars` is never reassigned).
  - `react/no-unknown-property` — `Computa.tsx:38,40-44,48-52,55-59,64-69` flags r3f-only props (`castShadow`, `geometry`, `material`, etc.) as unknown DOM attributes; resolves itself once the Computa.tsx fate above is decided (delete, or if kept, exclude it from `react/no-unknown-property` since it's a react-three-fiber file, not DOM JSX).

## Tier 4 — Accessibility (currently zero coverage)

- [ ] Add `alt` text to every `<img>` — confirmed 0/16 images have `alt` attributes (`Desktop.tsx`, `AboutMe.tsx`, `ContactMe.tsx`, `Resume.tsx`, `Steam.tsx`).
- [ ] Add `aria-*` attributes / roles to custom interactive elements — confirmed zero ARIA attributes anywhere in `src`.
- [ ] Make clickable `<div>`s keyboard-accessible (add `role`, `tabIndex`, `onKeyDown`) — desktop icons (`Desktop.tsx:63-71`), taskbar buttons (`Desktop.tsx:85-104`), Email/Links tabs (`ContactMe.tsx:55-70`).
- [ ] Fix `Steam.tsx:36-44` nav links (`Store`/`Library`/`Community`) — no `href`, not reachable via keyboard or screen reader. Use `<button>` if non-navigating, or add real `href`s.

## Tier 5 — Hooks / performance

- [ ] Wrap `onMouseUp` in `WindowModal.tsx` (`:45-48`) in `useCallback`, matching `onMouseMove` (`:33-42`) — currently it's redefined every render but is a `useEffect` dependency (`:67`), causing listener re-subscription on every render.
- [ ] Isolate the 1-second clock interval in `Desktop.tsx:46-52` into its own `<Clock />` component — right now it re-renders the entire desktop tree (all windows, icons, taskbar) every second.
- [ ] Consider `React.memo` for `WindowModal`/icon list items once the clock re-render issue above is fixed.
- [ ] Add `loading="lazy"` to below-the-fold images (game cards, placeholder gifs).

## Tier 6 — Testing & tooling

- [ ] No test framework exists at all — add `vitest` + `@testing-library/react`, and write at least a few tests for pure logic (`store.ts`, `utils.ts` are good easy starting points).
- [ ] Add a `format`/`format:check` npm script for the already-configured Prettier (`.prettierrc.cjs` exists but is never invoked anywhere).
- [ ] Add a `.prettierignore`.
- [ ] Add a pre-commit hook (Husky + lint-staged) so broken lint/format can't be committed again.
- [ ] Add basic CI (GitHub Actions) to run lint/build (and tests once they exist) on push/PR.
