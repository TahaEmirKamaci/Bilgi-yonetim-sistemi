
export default function CourseCard({ course, isTeacher, onEdit, onDelete }) {
    return (
      <div className="card p-6 flex flex-col h-full">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{course.name}</h2>
            <p className="text-gray-600 mt-2">{course.description}</p>
          </div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
            {course.code}
          </span>
        </div>
  
        <div className="mt-4 flex-grow">
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Haftalık: {course.hours} saat</span>
            </div>
            <div className="flex items-center text-gray-600">
              <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{course.teacher}</span>
            </div>
          </div>
        </div>
  
        {isTeacher && (
          <div className="mt-6 flex space-x-3">
            <button onClick={() => onEdit(course)} className="flex-1 btn btn-primary">
              Düzenle
            </button>
            <button onClick={() => onDelete(course.id)} className="flex-1 btn btn-danger">
              Sil
            </button>
          </div>
        )}
      </div>
    );
  }
  