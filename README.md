# WhatsApp Chat App

A WhatsApp-style chat web application built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. Demonstrates full CRUD operations with a NoSQL database, custom error handling, and async/await patterns.

## Tech Stack

- **Node.js** — runtime environment
- **Express.js** — web framework and routing
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM (Object Data Modeling)
- **EJS** — server-side HTML templating
- **dotenv** — secure environment variable management
- **method-override** — PUT/DELETE support for HTML forms

## Features

- View all chats on home page
- Create a new chat message
- View a single chat in detail
- Edit a chat message
- Delete a chat
- Custom error handling with `ExpressError` class
- Async error wrapper for clean route handlers

## Project Structure

```
whatsapp-chat-app/
├── models/
│   └── chat.js          # Mongoose schema and model
├── views/
│   ├── index.ejs        # all chats listing
│   ├── show.ejs         # single chat detail
│   ├── new.ejs          # create chat form
│   └── edit.ejs         # edit chat form
├── public/
│   └── style.css        # custom styles
├── index.js             # main server file
├── init.js              # sample data seeder
├── ExpressError.js      # custom error class
├── package.json
├── .env.example
└── .gitignore
```

## Mongoose Schema

```js
{
  from:       { type: String, required: true },
  to:         { type: String, required: true },
  msg:        { type: String },
  created_at: { type: Date, required: true },
  updated_at: { type: Date }
}
```

## Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/amitkorgavkar/whatsapp-chat-app.git

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URL

# 4. Seed sample data (optional)
node init.js

# 5. Start the server
node index.js

# 6. Open in browser
http://localhost:8080/chats
```

## Routes

| Method | Route           | Description               |
|--------|-----------------|---------------------------|
| GET    | /chats          | View all chats            |
| GET    | /chats/new      | Show create form          |
| POST   | /chats          | Create a new chat         |
| GET    | /chats/:id      | View single chat detail   |
| GET    | /chats/:id/edit | Show edit form            |
| PUT    | /chats/:id      | Update chat message       |
| DELETE | /chats/:id      | Delete a chat             |

## Key Concepts Demonstrated

- **Mongoose ODM** — schema definition, model creation, CRUD operations
- **asyncWrap** — reusable async error handling wrapper function
- **Custom ExpressError class** — structured error responses with status codes
- **dotenv** — environment variable management
- **method-override** — RESTful PUT/DELETE from HTML forms
