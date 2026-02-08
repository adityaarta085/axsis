# Axis Web Portal

Production-ready web portal for Axis internet provider.

## Setup
1. `docker-compose up --build`
2. Access frontend at `http://localhost:3000`
3. Access API at `http://localhost:4000/api`

## Tech Stack (Application Presence)
- **Engine**: [Next.js 14](https://nextjs.org/) (App Router) - The most modern and best-in-class React framework for Vercel deployment.
- **Backend**: Express.js + Prisma ORM.
- **Styling**: Tailwind CSS (Axis Purple #6A1B9A).
- **Monorepo Management**: [Turborepo](https://turbo.build/) for high-performance builds.
- **Database**: PostgreSQL.

## Deployment to Vercel
This project is pre-configured for Vercel deployment.
1. Connect your repository to Vercel.
2. Vercel will automatically detect the Next.js presence.
3. The `vercel.json` and `turbo.json` in the root ensure a smooth build process for the monorepo.
