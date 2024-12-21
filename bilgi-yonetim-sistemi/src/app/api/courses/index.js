import { NextResponse } from 'next/server';

const courses = [
  { id: 1, name: 'Math', approved: false, grade: null },
  { id: 2, name: 'Science', approved: false, grade: null },
  { id: 3, name: 'History', approved: false, grade: null },
  { id: 4, name: 'Art', approved: false, grade: null },
  { id: 5, name: 'Physical Education', approved: false, grade: null },
];

export async function GET() {
  return NextResponse.json(courses);
}

export async function POST(request) {
  const { id, approved, grade } = await request.json();

  const course = courses.find((c) => c.id === id);
  if (course) {
    course.approved = approved || course.approved;
    course.grade = grade || course.grade;
  }

  return NextResponse.json({ message: 'Course updated', courses });
}
