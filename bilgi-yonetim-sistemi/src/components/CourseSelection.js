'use client';

export default function CourseSelection({ selectedCourses, setSelectedCourses }) {
  const [availableCourses, setAvailableCourses] = useState([]);

  useEffect(() => {
    // Mevcut dersleri API'den al
    const fetchCourses = async () => {
      const res = await fetch('/api/courses');
      const data = await res.json();

      setAvailableCourses(data);
    };

    fetchCourses();
  }, []);

  const handleCourseSelection = async (courseId) => {
    const res = await fetch('/api/courses', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });

    if (res.ok) {
      setSelectedCourses((prev) => [...prev, courseId]);
    }
  };

  return (
    <div className="course-selection">
      <h2>Ders Seçimi</h2>
      <ul>
        {availableCourses.map((course) => (
          <li key={course.id}>
            {course.name}{' '}
            {!selectedCourses.includes(course.id) && (
              <button onClick={() => handleCourseSelection(course.id)}>Seç</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
