# 🛒 বাজার দর (BazarDor) — Programming Hero Assignment 07

BazarDor is a responsive Next.js web application developed for Programming Hero Assignment 07. It helps users explore everyday product prices in Bangladesh, compare market information, and browse products by category through a user-friendly interface — with full authentication, protected routes, and social login.

## Live Demo

- **Live Website:** https://bazardor-alpha-six.vercel.app
- **GitHub Repository:** https://github.com/raisul022/B14-A7-Bazar-Dor

## Key Features

1. **Real market prices at a glance** — homepage with hero section, live price ticker, and dedicated "দাম বেড়েছে" (rising) / "দাম কমেছে" (falling) sections.
2. **Smart browsing** — product search, category-based filtering, and category pages for rice, dal, oil, vegetables, fish, meat, and more.
3. **Deep price insight** — product detail pages with price history, market-wise prices, and min/max/average comparison — all in Bengali number format.
4. **Full authentication** — email/password plus Google and GitHub social login (Better Auth), with protected routes that redirect guests to sign in and return them afterwards.
5. **Polished UX** — session-aware navbar, profile page with name update, custom Bengali 404 page, loading/error/empty states, fully responsive on mobile.

## More Features

- Bengali date badge in the header.
- Category shortcuts strip under the header.
- Logout functionality.
- Reusable UI components and responsive layouts.

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth (email/password + Google + GitHub)
- PostgreSQL (`pg`)
- Lucide React
- Deployed on Vercel

## Getting Started

### Prerequisites

Install Node.js and npm.

```bash
node --version
npm --version
```

### 1. Clone the repository

```bash
git clone https://github.com/raisul022/B14-A7-Bazar-Dor.git
cd B14-A7-Bazar-Dor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```text
DATABASE_URL=your_postgresql_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Google and GitHub OAuth apps must include both callback URLs:

```text
http://localhost:3000/api/auth/callback/google
https://your-live-domain.vercel.app/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
https://your-live-domain.vercel.app/api/auth/callback/github
```

**Security note:** Never commit `.env.local` or any secrets to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |

## API Integration

**API Base URL:**

```text
https://openapi.programming-hero.com/api/bazardor
```

| Endpoint | Purpose |
|---|---|
| `GET /products` | Retrieve products |
| `GET /products?category=chal` | Retrieve products filtered by category |
| `GET /products/1` | Retrieve product details by ID |
| `GET /categories` | Retrieve available categories |
| `GET /categories/chal` | Retrieve category information |

The application includes loading and error handling for API requests.

## Project Structure

```text
app/
├── api/auth/[...all]/route.ts
├── categories/
│   ├── [slug]/page.tsx
│   └── page.tsx
├── products/[id]/page.tsx
├── profile/page.tsx
├── signin/page.tsx
├── signup/page.tsx
├── not-found.tsx        ← custom 404 page
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── site-header.tsx
└── ui/

lib/
├── api.ts
├── auth-client.ts
├── auth.ts              ← Better Auth server config (OAuth providers)
└── utils.ts             ← Bengali number/date helpers

proxy.ts                 ← route protection (Next.js proxy/middleware)

public/
└── Static assets
```

## Authentication

BazarDor uses Better Auth with:

- **Email + password** registration and sign in
- **Google login**
- **GitHub login**
- Session-aware navigation, profile access, profile name updates, and logout

Both OAuth apps are configured with localhost and production callback URLs, so social login works in development and on the live site.

## Route Protection

`proxy.ts` at the project root protects authenticated pages (such as the profile and product detail pages). Unauthenticated users are redirected to:

```text
/signin?callbackUrl=<original-path>
```

After a successful sign in, users are returned to the page they originally wanted.

## Deployment

- Hosted on **Vercel**: https://bazardor-alpha-six.vercel.app
- Pushes to the `main` branch trigger an automatic production deployment.
- All environment variables are configured in the Vercel dashboard for the **Production** environment.

## Quality Checks

```bash
npm run lint
npm run build
```

Both checks pass. Re-run them after making changes.

## Git Workflow

Use descriptive commit messages for meaningful changes.

```bash
git status
git add .
git commit -m "feat: your change description"
git push origin master:main
```

Do not create empty commits just to increase the commit count.

## Security

- Keep `.env.local` out of version control.
- Do not expose database URLs or authentication secrets.
- Configure production environment variables in the deployment platform.
- Verify authentication and database connectivity in the production environment.
