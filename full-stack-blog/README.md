# CodeCanvass

A full-stack blog: **React (Vite)** + **Express** + **MongoDB (Mongoose)**, with **Clerk** authentication and **ImageKit** media uploads.

## Features

- Sign up / sign in with Clerk; Mongo user sync via `POST /users/sync-user` (runs from the client after login).
- Create, list, and view posts (rich text with React Quill); featured posts and filters.
- Comments on posts (authenticated create/delete with ownership/admin rules).
- Optional Clerk webhooks for `user.created` / `user.deleted` (keeps DB in sync with Clerk when configured).
- Cover and inline image uploads through ImageKit (when keys are set).

## Project layout

```
full-stack-blog/
├── backend/          # Express API (port 3000 by default)
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── lib/          # DB helper, env validation, user sync helpers
└── client/           # Vite + React SPA
    └── src/
```

## Prerequisites

- Node.js 18+ (recommended)
- MongoDB connection string (Atlas or local)
- [Clerk](https://clerk.com/) application (publishable + secret keys)
- [ImageKit](https://imagekit.io/) account (optional, for uploads)

## Backend setup

```bash
cd backend
npm install
```

Create `backend/.env` (do not commit real values):

| Variable | Description |
| -------- | ----------- |
| `MONGO` | MongoDB connection URI |
| `CLIENT_URL` | Frontend origin for CORS (e.g. `http://localhost:5173`) |
| `CLERK_SECRET_KEY` | Clerk secret key (JWT verification) |
| `CLERK_WEBHOOK_SECRET` | Optional; required for `POST /webhooks/clerk` |
| `IK_PUBLIC_KEY` | ImageKit public key |
| `IK_PRIVATE_KEY` | ImageKit private key |
| `IK_URL_ENDPOINT` | ImageKit URL endpoint |

Run the API:

```bash
node index.js
```

The server listens on **port 3000**.

### Main API routes

| Method | Path | Notes |
| ------ | ---- | ----- |
| `POST` | `/users/sync-user` | Requires Clerk session; syncs Mongo user |
| `GET` | `/users/saved` | Saved posts for current user |
| `PATCH` | `/users/save` | Toggle saved post |
| `GET` | `/posts` | List / filter / paginate posts |
| `GET` | `/posts/upload-auth` | ImageKit auth params |
| `GET` | `/posts/:slug` | Single post |
| `POST` | `/posts` | Create post (authenticated) |
| `DELETE` | `/posts/:id` | Delete post |
| `PATCH` | `/posts/feature` | Feature toggle (admin) |
| `GET` | `/comments/:postId` | List comments |
| `POST` | `/comments/:postId` | Add comment |
| `DELETE` | `/comments/:id` | Delete comment |
| `POST` | `/webhooks/clerk` | Clerk webhook (raw body) |

## Frontend setup

```bash
cd client
npm install
```

Create `client/.env.local`:

| Variable | Description |
| -------- | ----------- |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `VITE_API_URL` | API base URL (e.g. `http://localhost:3000`) |
| `VITE_IK_PUBLIC_KEY` | ImageKit public key (client) |
| `VITE_IK_URL_ENDPOINT` | Same endpoint as backend `IK_URL_ENDPOINT` |

Run the dev server:

```bash
npm run dev
```

Default Vite URL: **http://localhost:5173**.

Build for production:

```bash
npm run build
npm run preview   # optional local preview of build
```

## Clerk configuration tips

- In the Clerk dashboard, allow your frontend URL as an allowed origin.
- Point **JWT / authorized parties** (or equivalent) at your API if you use strict validation.
- For webhooks, set the endpoint to your deployed API + `/webhooks/clerk` and paste the signing secret into `CLERK_WEBHOOK_SECRET`.

## Tech stack

- **Client:** React 18, Vite, React Router, TanStack Query, Tailwind CSS, Clerk React, ImageKit React, React Quill, Axios, React Toastify  
- **Server:** Express 5, Mongoose, Clerk Express middleware, ImageKit Node SDK, Svix (webhook verification)

## License

ISC / project default unless you specify otherwise.
