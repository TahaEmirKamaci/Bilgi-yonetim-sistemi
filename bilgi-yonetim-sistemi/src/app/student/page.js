'use client';

import { useEffect, useState } from 'react';
import CourseSelection from '@/components/CourseSelection';
import Navbar from '@/components/Navbar';

export default function StudentPage() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // Öğrencinin seçtiği dersleri ve notlarını API'den al
    const fetchStudentData = async () => {
      const res = await fetch('/api/courses?student=true');
      const data = await res.json();

      setSelectedCourses(data.selectedCourses);
      setGrades(data.grades);
    };

    fetchStudentData();
  }, []);

  return (
    <div className="student-page">
      <Navbar />
      <h1>Öğrenci Paneli</h1>

      {/* Ders Seçim Bileşeni */}
      <CourseSelection selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />

      {/* Ders Notları */}
      <div className="grades-section">
        <h2>Ders Notları</h2>
        {grades.length > 0 ? (
          grades.map((course, index) => (
            <div key={index} className="course-grade">
              <p>Ders: {course.name}</p>
              <p>Not: {course.grade || 'Henüz Girilmedi'}</p>
            </div>
          ))
        ) : (
          <p>Henüz ders seçimi yapmadınız.</p>
        )}
      </div>
    </div>
  );
}
