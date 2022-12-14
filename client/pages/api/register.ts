// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiURl } from '../../api'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(`${apiURl}/register`, {
    method: req.method,
    body: req.body ? JSON.stringify(req.body) : undefined,
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await response.json();
  res.status(res.statusCode).json(data)
}
