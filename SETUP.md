# kevinfloframe.com — Setup Guide

Next.js portfolio site. Deployed on Vercel. No CMS, no database, no paid services.

---

## Files

```
photography/website/
├── components/
│   ├── Nav.js          — fixed top nav + book button
│   └── Footer.js       — copyright + social links
├── pages/
│   ├── _app.js         — global CSS import
│   ├── index.js        — home (hero, featured work, CTA)
│   ├── portfolio.js    — full photo grid
│   ├── services.js     — packages + pricing
│   ├── about.js        — bio + gear table
│   └── contact.js      — booking links, payment methods
├── public/
│   ├── hero.jpg        — hero background (drop your best image here)
│   ├── about.jpg       — about page photo (portrait of Kevin)
│   └── portfolio/      — all portfolio images
│       ├── headshots-01.jpg
│       ├── headshots-02.jpg
│       ├── portrait-01.jpg
│       └── ...
├── styles/
│   └── globals.css     — dark theme, all component styles
├── next.config.js
└── package.json
```

---

## Step 1 — Add Photos

Before deploying, drop images into `public/`:

- `hero.jpg` — full-bleed hero background (landscape, ~1920×1080 minimum)
- `about.jpg` — portrait of Kevin for About page (portrait orientation)
- `public/portfolio/*.jpg` — naming: `{type}-{nn}.jpg` (e.g., `headshots-01.jpg`)

To activate portfolio images, edit `pages/portfolio.js` and uncomment/add entries in the `IMAGES` array.

---

## Step 2 — Install & Run Locally

```
cd photography/website
npm install
npm run dev
```

Open http://localhost:3000. Check all 5 pages and the Book button.

---

## Step 3 — Deploy to Vercel

1. Push the repo to GitHub (if not already)
2. Go to vercel.com → New Project
3. Import your GitHub repo
4. Set **Root Directory** to `photography/website`
5. Framework preset: **Next.js** (auto-detected)
6. Click Deploy

Vercel auto-deploys on every push to `main`.

---

## Step 4 — Connect Domain

**In Vercel:**
- Project → Settings → Domains → Add `kevinfloframe.com`
- Also add `www.kevinfloframe.com`
- Vercel shows the DNS values to enter

**In your domain registrar (GoDaddy or Squarespace DNS interim):**
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

SSL is automatic — Vercel handles it.

---

## Step 5 — Booker Link

The Book button and all booking CTAs point to `https://book.kevinfloframe.com`.

Make sure the booker (`photography/booker/`) is deployed to Vercel separately and that domain is connected. See `photography/booker/SETUP.md`.

---

## Adding Portfolio Images Over Time

1. Drop new `.jpg` files into `public/portfolio/`
2. Open `pages/portfolio.js`
3. Uncomment the `IMAGES` array or add a new entry:
   ```js
   { src: '/portfolio/headshots-01.jpg', category: 'Headshots', alt: 'Corporate headshot in Dallas' },
   ```
4. Push to GitHub → Vercel auto-deploys in ~60 seconds

No CMS login. No dashboard. Just drop files and push.

---

## Updating Packages & Pricing

Edit the `PACKAGES` array in `pages/services.js`. Same push-to-deploy flow.
