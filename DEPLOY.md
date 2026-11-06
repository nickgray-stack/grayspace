# Deploying Gray Space (GitHub → Vercel)

The build is Vercel-ready: `next build` is clean, every route prerenders static, and
there are no env vars for V1. These are the steps to do together (they touch your
GitHub + Vercel accounts, which is why they're not done already).

## 1. Push to GitHub

From the project folder (after `git` is set up with your identity):

```bash
# create a private repo under your account and push (GitHub CLI)
gh repo create grayspace --private --source=. --remote=origin --push

# …or create the repo on github.com first, then:
git remote add origin git@github.com:<you>/grayspace.git
git branch -M main
git push -u origin main
```

The repo already has a clean commit history and a `.gitignore` (node_modules/.next
excluded). Switzer ships in the repo under `app/fonts/` — see `app/fonts/README.txt`
and add the official ITF license file alongside it.

## 2. Import to Vercel

1. vercel.com → **Add New… → Project** → import the `grayspace` repo.
2. Framework preset: **Next.js** (auto-detected). Build command, output dir, install
   command: **leave as defaults.** No environment variables needed.
3. **Deploy.** First build takes ~1–2 min; you get a `*.vercel.app` preview URL.

## 3. Custom domain (grayspc.com)

Vercel → Project → **Settings → Domains** → add `grayspc.com` (and `www`). Point DNS
at Vercel (A record `76.76.21.21`, or the `CNAME` Vercel shows). SSL is automatic.

## 4. After it's live

- Update the `base` URL constants if the domain ever changes — they're set to
  `https://grayspc.com` in `app/sitemap.js`, `app/robots.js`, `app/layout.js` and the
  case-study metadata. (All already correct for grayspc.com.)
- Every push to `main` auto-deploys; branches get preview URLs — handy for reviewing
  content or UX changes before they go live.

## Notes

- **Media/video:** images currently live in `public/media`. As real assets land and
  grow, move large video to a CDN and serve via native `<video>` (the intended V1
  approach) rather than committing it.
- **Node:** project targets Node ≥18.18 (built on 22); Vercel uses a compatible
  version by default.
