
'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';

export default function TeacherPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses/route');
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Bu dersi silmek istediğinizden emin misiniz?')) {
      try {
        await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
        setCourses(courses.filter(course => course._id !== courseId));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Derslerim</h1>
            <p className="text-gray-600 mt-2">Verdiğiniz dersleri yönetin</p>
          </div>
          <button
            onClick={() => {
              setSelectedCourse(null);
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            Yeni Ders Ekle
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              isTeacher={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Ders Düzenleme/Ekleme Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCourse ? 'Dersi Düzenle' : 'Yeni Ders Ekle'}
            </h2>
            {/* Modal içeriği... */}
          </div>
        </div>
      )}
    </div>
  );
}
