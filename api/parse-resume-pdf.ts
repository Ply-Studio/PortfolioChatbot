import type { VercelRequest, VercelResponse } from '@vercel/node';
import { handleParseResumePdf } from '../src/server/geminiHandler';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { pdfBase64, fileName } = req.body;
    const result = await handleParseResumePdf(pdfBase64, fileName);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('API /api/parse-resume-pdf error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
