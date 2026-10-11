# Bazar Dor — Assignment 07

Bazar Dor is a Next.js web application for the Programming Hero Assignment 07. The project uses the Next.js App Router, React, TypeScript, Tailwind CSS 4, and reusable UI components.

## Tech Stack

- Next.js `16.4.0`
- React `19.3.0`
- TypeScript `5`
- Tailwind CSS `4`
- ESLint `9`
- Lucide React icons

## Getting Started

### 1. Requirements

Install a compatible current LTS version of Node.js and npm. Confirm the installation:

```bash
node --version
npm --version
```

### 2. Install dependencies

Run these commands from the project root, where `package.json` is located:

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Stop the server with `Ctrl+C`.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Check code with ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build; run after `npm run build` |

Run checks before submitting:

```bash
npm run lint
npm run build
```

## API

The assignment's updated API base URL is:

`https://openapi.programming-hero.com/api/bazardor`

Use this updated endpoint for the assignment's API integration. Inspect the actual JSON response before deciding the exact fields to render; do not assume a response shape. Handle loading, empty data, and request errors in the UI.

## Project Structure

```text
app/
  globals.css       Global styles and Tailwind CSS setup
  layout.tsx        Root layout and page metadata
  page.tsx          Home page
components/
  ui/               Reusable UI components
lib/
  utils.ts          Shared utility functions
public/             Static public assets
```

The project also includes the Bazar Dor design files and image assets in the project root. Keep these source assets while developing the assignment.

## Git Workflow

Make small commits that describe actual completed work. Before committing, inspect the changed files:

```bash
git status
git diff
```

Stage only the files related to the task, then commit with a descriptive message, for example:

```bash
git add README.md
git commit -m "docs: document Bazar Dor project setup"
```

Do not commit `node_modules`, `.next`, local environment secrets, or generated build output. Do not commit unrelated changes accidentally.

## Deployment

Deploy using a platform compatible with Next.js, such as Vercel. Configure any required environment variables in the deployment platform if the implementation later uses them. Verify the production build locally before submitting.
