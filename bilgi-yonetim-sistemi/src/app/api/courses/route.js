import db from '@/utils/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isStudent = searchParams.get('student');
  const isTeacher = searchParams.get('teacher');

  if (isStudent) {
    const studentId = 1; // Örnek ID, gerçek sistemde auth kullanılmalı
    const studentData = await db.collection('students').findOne({ id: studentId });

    return new Response(JSON.stringify({
      selectedCourses: studentData.selectedCourses || [],
      grades: studentData.grades || [],
    }), { status: 200 });
  }

  if (isTeacher) {
    const teacherId = 1; // Örnek ID
    const teacherCourses = await db.collection('courses').find({ teacherId }).toArray();

    return new Response(JSON.stringify({ courses: teacherCourses }), { status: 200 });
  }

  const courses = await db.collection('courses').find().toArray();
  return new Response(JSON.stringify(courses), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();

  if (body.courseId) {
    // Ders ekleme işlemi
    const studentId = 1; // Örnek ID
    await db.collection('students').updateOne(
      { id: studentId },
      { $addToSet: { selectedCourses: body.courseId } }
    );

    return new Response(JSON.stringify({ message: 'Ders seçildi' }), { status: 200 });
  }

  if (body.approved !== undefined) {
    // Ders onaylama veya not ekleme işlemi
    const { courseId, studentId, grade } = body;

    if (grade) {
      await db.collection('students').updateOne(
        { id: studentId },
        { $set: { [`grades.${courseId}`]: grade } }
      );

      return new Response(JSON.stringify({ message: 'Not girildi' }), { status: 200 });
    }

    await db.collection('courses').updateOne(
      { id: courseId },
      { $set: { approved: body.approved } }
    );

    return new Response(JSON.stringify({ message: 'Ders onaylandı' }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
}
