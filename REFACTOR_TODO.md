# Refactor To-Do (Interview Readiness)

Audit refreshed 2026-08-27. The 2026-08-10 pass (Tiers 1-3/5 below, mostly checked)
covered the desktop/window-manager UI. Since then the 3D scene (`Experience.tsx`,
`models/Computer.tsx`, `models/Room.tsx`, `store/sceneStore.ts`) was added and is
still in a rough, debug-instrumented state — that's the highest-priority work now.

## Tier 1 — New 3D scene: quick wins

- [ ] Remove/guard debug tooling shipped to prod: `leva` `useControls` panels in
  `Experience.tsx:30-38` and `Computer.tsx:55-85`, plus the `console.log` in
  `Experience.tsx:36`. Either gate them behind `import.meta.env.DEV` or delete —
  right now every visitor loads and renders the Leva panel and its state.
- [ ] Delete the dead commented-out `<mesh>` block in `Computer.tsx:97-148` — it's
  a stale first draft of the monitor/screen/button meshes, fully superseded by the
  positioned versions at `:149-202`.
- [ ] Remove unused controls in `Computer.tsx`: `positionX/Y/Z`, `rotationX/Y/Z`
  (`:57-62`, destructured from `useControls` but never read — the commented-out
  `position`/`rotation` props that used them are gone) and the commented-out lines
  referencing them at `:94-95`.
- [ ] Remove the unused `screenRef` (`Computer.tsx:40`) — created but never
  attached to a `<mesh ref={...}>` since the ref'd mesh block was deleted.
- [ ] Remove the empty `useFrame((state, delta) => {})` in `Computer.tsx:87` — a
  no-op callback still subscribes to the render loop for nothing.
- [ ] Delete unused `CameraRig` component in `Experience.tsx:10-17` — defined but
  never rendered; `intro`/`lookAtRoom`/`lookAtComputer` already handle camera
  movement via `CameraControls`.
- [ ] Fix duplicate object key in `Computer.tsx:24-29` — `GLTFResult["materials"]`
  types `"Material.001"` twice; the model actually has four materials, so this
  silently drops a real material's type.
- [ ] Resolve the two `// TODO` placeholders: `Experience.tsx:19` ("explain") on
  `CAMERA_POSITIONS`, and `sceneStore.ts:3` ("move") on the `View` enum — either
  act on them or write the real comment/relocate the enum.
- [ ] Fix malformed tag in `index.html:11` — `<meta name="welcome to my room :3" />`
  has no `content` attribute (the text ended up as the `name`, so it does nothing);
  either remove it or turn it into a real `<meta name="description" content="...">`.
- [ ] Uncomment/add `og:image` in `index.html:8` and add a real favicon — `<title>`
  and other OG tags exist, but there's still no favicon file in `public/` and the
  `og:image` line is commented out.

## Tier 2 — 3D scene: structural

- [ ] Un-nest `QueryClientProvider` — it's currently mounted three times:
  `main.tsx:36`, `App.tsx:15`, and again inside `Computer.tsx:128/181` (conditionally,
  only when `showComputerScreen`). One provider at the root (`main.tsx`) is enough;
  remove the other two.
- [ ] Decide the routing story. `main.tsx` hand-writes two routes (`/` → `App`
  which renders the 3D scene, `/desktop` → `Desktop` directly, bypassing the 3D
  intro entirely) using `createRoute`/`createRootRoute`. Meanwhile
  `@tanstack/router-plugin` is a devDependency but never added to `vite.config.ts`
  — so it buys nothing today. Either wire up file-based routing (`routesDirectory`
  in `vite.config.ts`) and remove the hand-rolled route tree, or drop the plugin
  dependency and keep it manual. Also decide if `/desktop` should still exist as a
  direct link (`App.tsx:12`) once the 3D computer screen is the intended way in.
- [ ] Extract the hardcoded camera vectors (`Experience.tsx:20-24, 41-74`) into
  named, documented constants — six raw floats per position with no explanation
  of what "computer" vs "room" framing represents makes this the hardest file in
  the repo to walk through in an interview.
- [ ] Configure ESLint for react-three-fiber files instead of accepting the noise:
  `react/no-unknown-property` currently fires 60+ times across `Computer.tsx` and
  `Room.tsx` for legitimate r3f props (`castShadow`, `geometry`, `position`, etc.).
  Add an override block in `eslint.config.js` scoping `react/no-unknown-property`
  off (or to its `ignore` list) for `src/models/**` and `src/Experience.tsx`.
- [ ] Fix `Desktop.tsx:32-36` — `showStartMenu && setShowStartMenu(false)` trips
  `@typescript-eslint/no-unused-expressions` because a bare `&&` used for its
  side effect reads as a mistake. Rewrite as `if (showStartMenu) setShowStartMenu(false)`.

## Tier 3 — Dependency hygiene

- [ ] Remove unused dependencies (none are imported anywhere in `src/`):
  `body-parser` (a server middleware package with no purpose in a Vite/React
  frontend), and `react-pdf` (the resume is served as a plain download link in
  `Resume.tsx:196-197`, not rendered with `react-pdf`).
- [ ] Either use or remove `@tanstack/router-plugin` (see routing decision above).
- [ ] Replace remaining `any`: `src/api/api.ts:9` — `(game: any) =>` in
  `getRecentlyPlayedGames`. Type the raw Steam API shape instead of casting the
  mapped result `as unknown as GameData` (`api.ts:15`).

## Tier 4 — Previously completed (2026-08-10 pass)

Everything below was already fixed and verified against the current code — kept
for history, not action items:

- Lint setup (ESLint v9 flat config), README rewrite, `package.json` name/version,
  `index.html` title/meta/OG tags scaffolding, stray `console.log`/dead code
  removal, `.DS_Store` untracked, missing image asset fixed.
- `FormField` extraction in `ContactMe.tsx`, data-driven `AboutMe.tsx` sections,
  generic `WindowModal` (no more `id === 'CONTACT_ME'` special-casing), data-driven
  Email/Links tabs, `API_BASE_URL` extraction, hoisted `WINDOW_COMPONENTS`,
  removed unused `MySpace`/`Mystery` stubs.
- `Email`/`Section` types moved to `src/types/types.ts`; `Window` interface
  renamed to `DesktopWindow` (no more shadowing `globalThis.Window` — confirmed
  in `src/store/windowStore.ts` and `src/types/types.ts`).
- `alt` text on images, keyboard accessibility (`role`/`tabIndex`) on desktop
  icons/taskbar/tabs, `WindowModal` `onMouseUp` wrapped in `useCallback`, `Clock`
  isolated into its own component so the 1s tick no longer re-renders the whole
  desktop.

Note: the old `src/models/Computa.tsx` this list used to reference no longer
exists — it's been replaced by the real `Computer.tsx`/`Room.tsx` pair above, so
those old action items are superseded by Tier 1/2.

## Tier 5 — Accessibility (still open)

- [ ] Add `aria-*` attributes/roles beyond the `role="button"`/`tabIndex` already
  in place — e.g. the start menu (`Desktop.tsx:64-85`) has no `role="menu"`, and
  none of the clickable `<div>`s have `onKeyDown` handlers, so they're focusable
  but not activatable from a keyboard.

## Tier 6 — Testing & tooling

- [ ] No test framework exists — add `vitest` + `@testing-library/react`. Good
  starting points: `windowStore.ts` (pure state transitions, easy to assert),
  `utils.ts`, and `api.ts` (mock `fetch`).
- [ ] Add a `format`/`format:check` npm script for the already-configured
  Prettier (`.prettierrc.cjs`/`.prettierrc.json` exist but nothing invokes them).
- [ ] Add a `.prettierignore` (currently missing).

## Suggested order for interview prep

1. Tier 1 (3D quick wins) — highest visual noise-to-effort ratio; a Leva panel
   and console.log on load are the first thing anyone opening the deployed site
   or the diff will notice.
2. Tier 2 (3D structural) — the triple `QueryClientProvider` and the unresolved
   routing story are the kind of thing an interviewer will poke at directly
   ("why does `/desktop` skip the 3D scene?").
3. Tier 3 (dependency hygiene) — cheap, and an unused `body-parser` in a frontend
   `package.json` is an easy thing to get asked about.
4. Tier 5/6 (a11y, testing) — good "what would you do with more time" talking
   points if you don't get to them before an interview.