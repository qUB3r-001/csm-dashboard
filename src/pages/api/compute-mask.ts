// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  res.status(200).json({ maskedUrl: 'https://i.imgur.com/XKAdtN1.jpeg' });
}
