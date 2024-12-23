import { connectDB } from '../../../utils/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    
    const testData = {
      email: "ogretmen@example.com",
      password: "123456"
    };

    const { email: testEmail, password: testPassword } = testData;

    const db = await connectDB();

    const user = await db.collection('users').findOne({ email: testEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.password !== testPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
