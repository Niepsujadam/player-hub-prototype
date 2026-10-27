# William Hill My Players

Imported from the supplied Figma Make ZIP. The original React UI, CSS, assets, and prototype interactions are preserved.

## Run locally

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open http://localhost:8443. The layout preserves the original mobile app width on desktop.

## Verify and build

```sh
npx tsc --noEmit
npm run build
```

The production output is in `dist/`. Player images and SF Pro fonts reference the original external URLs. Player data and betting interactions are prototype data; followed players and Starting XI choices are saved in browser local storage.
