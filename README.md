# BazarDor — Assignment 07

BazarDor is a Next.js web application developed for Programming Hero Assignment 07. It helps users explore product prices and compare market information through a responsive interface.

## Features

- Responsive navigation and homepage layout.
- Product listing with search functionality.
- Rising and falling product sections.
- Category listing and category-based product filtering.
- Product detail pages with price and market information.
- Loading states, error handling, and retry options.
- Bengali price formatting and reusable UI components.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth (dependency installed; authentication setup is in progress)
- Lucide React icons

## Getting Started

### Requirements

Install Node.js and npm. Verify the installation:

```bash
node --version
npm --version
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Stop the development server with `Ctrl+C`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Check code using ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |

Before submitting, run:

```bash
npm run lint
npm run build
```

## API Integration

API base URL:

```text
https://openapi.programming-hero.com/api/bazardor
```

Endpoints used by the application include:

- `GET /products` — retrieve products.
- `GET /products?category=chal` — retrieve products filtered by category.
- `GET /products/1` — retrieve a product by ID.
- `GET /categories` — retrieve categories.
- `GET /categories/chal` — retrieve category information.

The application handles API responses and includes loading and error states.

## Project Structure

```text
app/
├── categories/
│   ├── [slug]/
│   │   └── page.tsx
│   └── page.tsx
├── products/
│   └── [id]/
│       └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx

components/
└── ui/

lib/
├── api.ts
└── utils.ts

public/
└── Static assets
```

## Quality Checks

The ESLint check and production build have passed during development. Run them again after making further changes.

## Git Workflow

Use descriptive commits for completed features:

```bash
git status
git add README.md
git commit -m "docs: update project documentation"
```


