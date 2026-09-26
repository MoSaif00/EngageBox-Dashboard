# EngageBox Dashboard

A powerful dashboard application for managing user feedback collection projects. Built with Next.js and modern web technologies.

## ✨ [Related Widget](https://github.com/MoSaif00/EngageBox-Widget.git)

## ✨ [App Demo](https://engage-box.vercel.app/)

![Home Page](./public/home.png)

![Dashboard](./public/dashboardDark.png)

## Prerequisites

Before you begin, ensure you have:

- Node.js (v16 or higher)
- npm or yarn package manager
- Clerk account
- Stripe account
- Supabase project

## Environment Setup

1. Clone the repository:

```bash
git clone https://github.com/MoSaif00/EngageBox-Dashboard.git
cd engagebox-dashboard
```

2. Create a `.env.local` file (see `.env.example`) with:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...   # pk_test_ only for local/dev
CLERK_SECRET_KEY=sk_live_...
DATABASE_URL=<Supabase Transaction pooler URI, port 6543>
WIDGET_URL=<Domain where the widget is deployed>
NEXT_PUBLIC_PUBLISHABLE_KEY=<Stripe publishable key>
STRIPE_SECRET_KEY=<Stripe secret key>
STRIPE_WEBHOOK_SECRET=<Stripe webhook secret>
STRIPE_WEBHOOK_LOCAL_SECRET=<Local Stripe webhook secret>
NEXT_PUBLIC_BASE_URL=<Dashboard URL, e.g. https://engage-box.vercel.app>
```

### Production checklist (Clerk + Vercel)

1. Create a **Clerk Production** instance and copy `pk_live_` / `sk_live_` keys.
2. In Vercel → Project → Settings → Environment Variables, set those keys for **Production** (not just Development). Redeploy after changing.
3. In Clerk Dashboard → Domains, add your Vercel production domain.
4. For `DATABASE_URL`, use Supabase **Transaction pooler** (`:6543`), not the direct `:5432` connection, on Vercel serverless.
5. Vercel “Needs Attention” on secrets usually means re-paste the value for Production and redeploy.

3. Install dependencies:

```bash
npm install
```

4. Set up the database:

```bash
npm run db:generate  # Generate database client
npm run db:migrate  # Run migrations
npm run db:push     # Push schema changes
```

5. Start the development server:

```bash
npm run dev
```

## Database Management

The application uses DrizzleORM with PostgreSQL. Key commands:

- `npm run db:generate`: Generate database client
- `npm run db:migrate`: Run database migrations
- `npm run db:push`: Push schema changes to database

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS, shadcn/ui
- **Authentication**: Clerk
- **Database**: PostgreSQL with DrizzleORM
- **Payments**: Stripe
- **Backend Services**: Supabase
- **Styling**: TailwindCSS

## Deployment

The application can be deployed to any platform that supports Next.js applications (Vercel, Netlify, etc.).

1. Configure environment variables on your hosting platform
2. Connect your repository
3. Deploy the application
