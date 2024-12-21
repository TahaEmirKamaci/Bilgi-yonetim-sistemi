import db from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = JSON.parse(req.body);

    const user = await db.collection('users').findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ role: user.role, userId: user._id });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
