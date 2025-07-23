# facebook-backend

## Setup
1. Make sure MongoDB is running locally (default: mongodb://localhost/facebook)
2. Copy `.env` to your root and set your secrets (see .env example)
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node app.js
   ```

## API Endpoints
- POST `/api/auth/register` — Register user `{ username, email, password }`
- POST `/api/auth/login` — Login `{ email, password }` (returns JWT)
- POST `/api/posts` — Create post `{ text }` (requires JWT in `Authorization` header)
- GET `/api/posts` — Get all posts 