import db from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { courseId, teacherId, approved, grade } = JSON.parse(req.body);

    const course = await db.collection('courses').findOne({ _id: courseId, teacherId });

    if (!course) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await db.collection('courses').updateOne(
      { _id: courseId },
      { $set: { approved, grade } }
    );

    res.status(200).json({ message: 'Course updated successfully' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
