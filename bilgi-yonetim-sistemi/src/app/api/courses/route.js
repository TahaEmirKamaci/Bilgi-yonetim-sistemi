
export default async function handler(req, res) {
  const { method } = req;
  const user = await authMiddleware(req, res);

  try {
    const db = await connectDB();

    switch (method) {
      case 'GET':
        const courses = user.role === 'teacher'
          ? await db.collection('courses').find({ teacherId: user._id }).toArray()
          : await db.collection('courses').find({}).toArray();
        return res.status(200).json(courses);

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}
