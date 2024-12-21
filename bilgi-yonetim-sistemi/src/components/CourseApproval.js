'use client';

export default function CourseApproval({ course }) {
  const handleApproval = async () => {
    const res = await fetch('/api/courses/manage', {
      method: 'POST',
      body: JSON.stringify({ courseId: course.id, approved: true }),
    });

    if (res.ok) {
      alert('Ders onaylandı!');
    }
  };

  const handleGradeEntry = async (studentId, grade) => {
    const res = await fetch('/api/courses/manage', {
      method: 'POST',
      body: JSON.stringify({ courseId: course.id, studentId, grade }),
    });

    if (res.ok) {
      alert('Not girildi!');
    }
  };

  return (
    <div className="course-approval">
      <h2>Ders: {course.name}</h2>
      {!course.approved && <button onClick={handleApproval}>Dersi Onayla</button>}
      {course.students.map((student) => (
        <div key={student.id} className="student">
          <p>Öğrenci: {student.name}</p>
          <input
            type="text"
            placeholder="Not gir"
            onBlur={(e) => handleGradeEntry(student.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
