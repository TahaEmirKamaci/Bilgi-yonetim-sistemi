import connectDB from '../lib/mongodb';
import User from '../models/User';
import Course from '../models/Course';
import Enrollment from '../models/Enrollment';
import bcrypt from 'bcryptjs';

async function seedDatabase() {
  try {
    await connectDB();

    await User.deleteMany({});
    await Course.deleteMany({});
    await Enrollment.deleteMany({});

    
    const hashedPassword = await bcrypt.hash('123456', 10);
    const teacher = await User.create({
      email: 'ogretmen@example.com',
      password: hashedPassword,
      role: 'teacher',
      fullName: 'Ahmet Öğretmen'
    });

    const student = await User.create({
      email: 'ogrenci@example.com',
      password: hashedPassword,
      role: 'student',
      fullName: 'Mehmet Öğrenci'
    });

    const course = await Course.create({
      title: 'Matematik 101',
      description: 'Temel matematik dersi',
      teacherId: teacher._id,
      capacity: 30,
      status: 'active'
    });

    await Enrollment.create({
      courseId: course._id,
      studentId: student._id,
      status: 'approved'
    });

    console.log('Veritabanı başarıyla dolduruldu!');
    process.exit(0);

  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
}

seedDatabase();