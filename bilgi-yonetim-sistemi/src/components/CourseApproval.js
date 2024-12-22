
'use client';
export default function CourseApproval({ courseId, onApprove, onReject }) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onApprove(courseId)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Onayla
      </button>
      <button
        onClick={() => onReject(courseId)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reddet
      </button>
    </div>
  );
}