export default async function handler(req, res) {
  const { method } = req;
  const user = await authMiddleware(req, res);

  if (user.role !== 'teacher') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const db = await connectDB();
    
    switch (method) {
      case 'PUT':
        const { courseId, updates } = req.body;
        await db.collection('courses').updateOne(
          { _id: courseId, teacherId: user._id },
          { $set: updates }
        );
        return res.status(200).json({ message: 'Course updated' });
        
      case 'DELETE':
        const { id } = req.query;
        await db.collection('courses').deleteOne(
          { _id: id, teacherId: user._id }
        );
        return res.status(200).json({ message: 'Course deleted' });
        
      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
