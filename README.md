# BazarDor — Programming Hero Assignment 07

BazarDor is a responsive Next.js web application developed for Programming Hero Assignment 07. It helps users explore everyday product prices, compare market information, and browse products by category through a user-friendly interface.

## Live Demo

- **Live Website:** https://bazardor-alpha-six.vercel.app
- **GitHub Repository:** https://github.com/raisul022/B14-A7-Bazar-Dor

## Features

- Responsive homepage and navigation for desktop and mobile devices.
- Product listing with search functionality.
- Dedicated sections for rising and falling product prices.
- Category listing and category-based product filtering.
- Product detail pages with price history and market-wise price information.
- Price comparison information, including minimum, maximum, and average prices where available.
- Bengali number formatting for product prices.
- Email and password authentication using Better Auth.
- Profile page with user information and name update functionality.
- Protected profile access for authenticated users.
- Logout functionality.
- Loading indicators, error messages, retry options, and empty states.
- Reusable UI components and responsive layouts.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- PostgreSQL
- Lucide React

## Getting Started

### Prerequisites

Install Node.js and npm.

Verify your installation:

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

Create a `.env.local` file in the project root and configure the required environment variables for the authentication and database setup.

Use the project's existing environment variable names and the appropriate values for your own database and authentication configuration.

**Security note:** Never commit `.env.local`, database credentials, authentication secrets, or OAuth secrets to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Stop the development server with `Ctrl+C`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |

Before submitting, run:

```bash
npm run lint
npm run build
```

## API Integration

**API Base URL:**

```text
https://openapi.programming-hero.com/api/bazardor
```

The application uses the following API endpoints:

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
├── api/
│   └── auth/
│       └── [...all]/
│           └── route.ts
├── categories/
│   ├── [slug]/
│   │   └── page.tsx
│   └── page.tsx
├── products/
│   └── [id]/
│       └── page.tsx
├── profile/
│   └── page.tsx
├── signin/
│   └── page.tsx
├── signup/
│   └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── site-header.tsx
└── ui/

lib/
├── api.ts
├── auth-client.ts
├── auth.ts
└── utils.ts

public/
└── Static assets

README.md
```

## Authentication

BazarDor uses Better Auth for email and password authentication.

Implemented account features include:

- Account registration
- Sign in
- Session-aware navigation
- Profile access
- Profile name updates
- Logout

Google and GitHub authentication require additional OAuth provider credentials and configuration. They should not be considered active unless that configuration has been completed and tested.

## Quality Checks

Run the lint and production build commands before submitting the project:

```bash
npm run lint
npm run build
```

Both checks have passed during development. Run them again after making further changes.

## Git Workflow

Use descriptive commit messages for meaningful changes.

```bash
git status
git add .
git commit -m "feat: complete profile page"
git push origin main
```

Do not create empty commits just to increase the commit count.

## Security

- Keep `.env.local` out of version control.
- Do not expose database URLs or authentication secrets.
- Configure production environment variables in the deployment platform.
- Verify authentication and database connectivity in the production environment.