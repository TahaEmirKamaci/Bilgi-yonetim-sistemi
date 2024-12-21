import db from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, role } = JSON.parse(req.body);

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await db.collection('users').insertOne({
      email,
      password,
      role, // "student" veya "teacher"
    });

    res.status(201).json({ message: 'User registered', userId: newUser.insertedId });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
