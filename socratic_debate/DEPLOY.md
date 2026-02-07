# 🚀 Quick Deployment (1 Minute)

### 1. Frontend (Vercel)
1. Push your code to a **GitHub** repo.
2. Go to [Vercel](https://vercel.com) and click **Import Project**.
3. Select the `client` folder.
4. Set **Build Command**: `npm run build`.
5. Set **Output Directory**: `dist`.
6. Click **Deploy**. Done.

### 2. Backend (Render - Free)
1. Go to [Render.com](https://render.com).
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repo.
4. Set **Root Directory**: `server`.
5. Set **Build Command**: `npm install`.
6. Set **Start Command**: `node index.js`.
7. Add **Environment Variables**:
   - `GROQ_API_KEY`: (Your Key)
   - `PORT`: 10000
8. Click **Create Web Service**.

### 3. Connect them
- Overwrite the URL in `useDebateEngine.js` with your Render URL (e.g., `https://your-backend.onrender.com/api/chat`).
- Refresh Vercel. 🔥
