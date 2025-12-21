# codeCanvas Blogging App

A minimal full-stack blogging app built using **MongoDB, Express, React, and Node.js**. Users can create, read, update, and delete blog posts.

## Features

* User authentication (JWT)
* Create & edit blog posts
* View all posts
* Delete own posts
* Simple clean UI

## Tech Stack

**Frontend:** React, Axios
**Backend:** Node.js, Express.js
**Database:** MongoDB (Mongoose)

## Installation

### Backend

```
cd server
npm install
npm run dev
```

### Frontend

```
cd client
npm install
npm start
```

## Environment Variables

Create a `.env` file in `/server`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

## API Routes (Basic)

* `POST /api/auth/register`
* `POST /api/auth/login`
* `GET /api/posts`
* `POST /api/posts`
* `PUT /api/posts/:id`
* `DELETE /api/posts/:id`

## Folder Structure

```
root/
 ├─ server/
 └─ client/
```

## Run Both Servers

Frontend runs on **3000**, backend on **5000**.
Make sure CORS is enabled in Express.

## License

MIT
