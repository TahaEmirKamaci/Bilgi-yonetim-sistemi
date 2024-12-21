'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import CourseApproval from '@/components/CourseApproval';

export default function TeacherPage() {
  const [assignedCourses, setAssignedCourses] = useState([]);

  useEffect(() => {
    // Öğretmenin derslerini API'den al
    const fetchTeacherData = async () => {
      const res = await fetch('/api/courses?teacher=true');
      const data = await res.json();

      setAssignedCourses(data.courses);
    };

    fetchTeacherData();
  }, []);

  return (
    <div className="teacher-page">
      <Navbar />
      <h1>Öğretmen Paneli</h1>

      {/* Ders Onaylama ve Not Giriş Bileşeni */}
      {assignedCourses.length > 0 ? (
        assignedCourses.map((course, index) => (
          <CourseApproval key={index} course={course} />
        ))
      ) : (
        <p>Henüz atanmış dersiniz yok.</p>
      )}
    </div>
  );
}
