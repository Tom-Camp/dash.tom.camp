---
description: Launch the dash.tom.camp dev server and verify it in a browser
---

# Run skill — dash.tom.camp

## Launch

```bash
npm run dev > /tmp/vite.log 2>&1 &
VITE_PID=$!
# Wait for Vite to be ready
until grep -q "Local:" /tmp/vite.log 2>/dev/null; do sleep 0.5; done
echo "Dev server running at http://localhost:5173 (PID $VITE_PID)"
```

## Smoke-test with curl (fast, no browser needed)

```bash
# Home page loads
curl -sf http://localhost:5173/ -o /dev/null && echo "OK: home"

# Garden.net page loads
curl -sf http://localhost:5173/garden-net -o /dev/null && echo "OK: garden-net"

# Germinator page loads
curl -sf http://localhost:5173/germinator -o /dev/null && echo "OK: germinator"

# NuLay page loads
curl -sf http://localhost:5173/nulay -o /dev/null && echo "OK: nulay"
```

## Browser-driven verification (Playwright)

Use `chromium-cli` to take a screenshot and inspect rendered content:

```bash
# Screenshot the home page
chromium-cli --url http://localhost:5173/ --screenshot /tmp/home.png

# Screenshot garden-net
chromium-cli --url http://localhost:5173/garden-net --screenshot /tmp/garden-net.png
```

Check the screenshots to confirm charts render, device names appear, and no
error states are shown.

## Verify SSR data is populated

For SSR routes, the loader data is embedded in the HTML. Grep for it directly:

```bash
# Confirm garden device name is not a fallback "Sensor N"
curl -s http://localhost:5173/ | grep -o '"name","[^"]*"'

# Confirm garden-net page has readings data
curl -s http://localhost:5173/garden-net | grep -o 'readings'
```

## Stop the server

```bash
kill $VITE_PID 2>/dev/null
# or by port if PID was lost:
fuser -k 5173/tcp 2>/dev/null
```

## Notes

- Port: **5173** (Vite default, defined in `vite.config.ts` / Vite defaults)
- Requires `.env` with `VITE_API_BASE_URL`, `VITE_GARDEN_NET_DEVICE_IDS`,
  `VITE_GERMINATOR_DEVICE_ID`, and `VITE_NULAY_DEVICE_ID` set — see `.env.example`
- SSR is enabled; the loader runs server-side, so `curl` responses contain
  fully rendered HTML including loader data
- HMR works normally during development — no restart needed for code changes,
  only for `.env` changes
