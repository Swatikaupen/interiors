# React/Vite migration — parked

The working tree previously replaced the live static `index.html` with a Vite
entry shell (`index.vite-entry.html` here) as part of a partial React migration
(`src/App.tsx`, `vite.config.ts`, tailwind/postcss configs).

Decision (2026-06-13): ship & keep polishing the existing **static** site
(`/index.html`), which is what is deployed at openstorey.design. The React work
in `src/` is untouched and can be resumed later. When resuming, restore this
file to root `index.html` (Vite uses root index.html as its build entry).
