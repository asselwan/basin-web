# Basin web

The public landing page for the Basin Android app. It is also the destination for links shared from a Basin Card snapshot. `/.well-known/assetlinks.json` supports the Android App Link `https://basin.nomoi.ai/auth/accounts/callback`.

Deploy in Coolify with the **Dockerfile** build pack and domain `basin.nomoi.ai`. The Dockerfile serves the single `index.html` through nginx.

The `sha256_cert_fingerprints` array in `assetlinks.json` is intentionally empty pending a read of Basin's Play App Signing certificate SHA-256 in Play Console. App Links will not verify until it is filled and redeployed.
