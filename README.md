# Basin web

The public landing page for the Basin Android app. It is also the destination for links shared from a Basin Card snapshot. `/.well-known/assetlinks.json` supports the Android App Link `https://basin.nomoi.ai/auth/accounts/callback`.

Deploy in Coolify with the **Dockerfile** build pack and domain `basin.nomoi.ai`. The Dockerfile serves the single `index.html` through nginx.

`sha256_cert_fingerprints` in `assetlinks.json` is Basin's live Play App Signing certificate for
`com.nomoi.tacit` (fetched from `androidpublisher.generatedApks.list` for production versionCode
126, via the `play-publisher@tacit-7e9da` service account — not the upload key).
