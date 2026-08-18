import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createExpressApp, ensureDbReady } from './backend/app.ts';

async function startServer() {
  const app = createExpressApp();
  const PORT = 3000;

  await ensureDbReady();

  // ==========================================
  // Frontend Serving (Vite dev or Static dist)
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      if (req.path.startsWith('/admin/login')) {
        res.sendFile(path.join(distPath, 'admin/login/index.html'));
      } else if (req.path.startsWith('/admin')) {
        res.sendFile(path.join(distPath, 'admin/index.html'));
      } else if (req.path.startsWith('/privacy')) {
        res.sendFile(path.join(distPath, 'privacy/index.html'));
      } else if (req.path.startsWith('/terms')) {
        res.sendFile(path.join(distPath, 'terms/index.html'));
      } else if (req.path.startsWith('/thank-you')) {
        res.sendFile(path.join(distPath, 'thank-you/index.html'));
      } else {
        res.sendFile(path.join(distPath, 'index.html'));
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
