
import { connectDB } from '../../utils/db';
import { authMiddleware } from '../../utils/auth';

export default async function handler(req, res) {
  try {
    const user = await authMiddleware(req, res);
    const db = await connectDB();
    
    if (req.method === 'GET') {
      const courses = await db.collection('courses').find({}).toArray();
      return res.status(200).json(courses);
    }

    if (req.method === 'POST' && user.role === 'teacher') {
      const { name, description } = req.body;
      const course = await db.collection('courses').insertOne({
        name,
        description,
        teacherId: user._id,
        createdAt: new Date()
      });
      return res.status(201).json(course);
    }

    res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
