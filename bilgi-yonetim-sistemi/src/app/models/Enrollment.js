const enrollmentSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: String, 
    enrollmentDate: { type: Date, default: Date.now }
  });
  
  const enrollments = [
    {
      courseId: "course_id_here",
      studentId: "student_id_here",
      status: "approved",
      enrollmentDate: new Date()
    }
  ];