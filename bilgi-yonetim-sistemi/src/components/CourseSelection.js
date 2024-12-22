
'use client';
export default function CourseSelection({ courses, onSelect }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {courses.map((course) => (
        <div key={course._id} className="flex items-center space-x-4 p-4 border rounded">
          <input
            type="checkbox"
            onChange={(e) => onSelect(course._id, e.target.checked)}
            className="h-4 w-4"
          />
          <div>
            <h3 className="font-semibold">{course.name}</h3>
            <p className="text-sm text-gray-600">{course.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}