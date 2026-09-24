import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleGeminiChat } from '../src/server/geminiHandler';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers for Webflow embedding
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const reply = await handleGeminiChat(req.body);
    return res.status(200).json({ reply });
  } catch (err: any) {
    console.error('API /api/chat error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
