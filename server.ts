import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleGeminiChat, handleParseResumePdf } from './src/server/geminiHandler';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Enable Cross-Origin Resource Sharing (CORS) & Iframe Embedding for Webflow / External Sites
app.use((req, res, next) => {
  res.removeHeader('X-Frame-Options');
  res.setHeader('Content-Security-Policy', "frame-ancestors * http://localhost:* https://*.webflow.io https://*.webflow.com https://www.ivanzhao.design https://ivanzhao.design");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '20mb' }));

// Serve widget.js directly from public folder or dist
app.get('/widget.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.resolve(__dirname, 'public', 'widget.js'));
});

app.post('/api/chat', async (req, res) => {
  try {
    const reply = await handleGeminiChat(req.body);
    res.json({ reply });
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    res.status(500).json({ error: err.message || 'Error processing chat request' });
  }
});

app.post('/api/parse-resume-pdf', async (req, res) => {
  try {
    const { pdfBase64, fileName } = req.body;
    const result = await handleParseResumePdf(pdfBase64, fileName);
    res.json(result);
  } catch (err: any) {
    console.error('PDF Parse Error:', err);
    res.status(500).json({ error: err.message || 'Error parsing PDF resume' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Static assets from Vite production build
const distPath = path.resolve(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Ivan Zhao Cyber Portfolio server running on http://0.0.0.0:${PORT}`);
});
