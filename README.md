# Karta Kurdî — Nasnameya Dijîtal

Professional, mobile-first digital identity card interface.

## 1. Supabase
Open Supabase → SQL Editor and run `schema.sql`.

Then open `app.js` and replace:
- `PASTE_YOUR_SUPABASE_PROJECT_URL_HERE`
- `PASTE_YOUR_PUBLISHABLE_KEY_HERE`

Use only the **Publishable** key. Never put a `secret` / `service_role` key in this project.

## 2. GitHub
Upload all project files to the root of your `karta-kurdi` repository.

## 3. Free publishing
You can publish the static site with GitHub Pages:
Repository → Settings → Pages → Deploy from branch → `main` → `/ (root)` → Save.

The site will then have a free `github.io` address.

## 4. Next upgrades
For a production identity platform, add email verification, rate limiting/CAPTCHA, profile ownership, card revocation, audit logs, and a privacy/terms page.
