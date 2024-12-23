import { connectDB } from '../utils/db';

const userSchema = new mongoose.Schema({
    email: String,
    password: String, 
    role: String, 
    fullName: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  
  const seedData = async () => {
    const db = await connectDB();
  
    const users = [
      {
        email: "ogretmen1@example.com",
        password: "123456",
        role: "teacher",
        fullName: "Ahmet Öğretmen"
      },
      {
        email: "ogretmen2@example.com",
        password: "123456",
        role: "teacher",
        fullName: "Fatma Öğretmen"
      },
      {
        email: "ogrenci1@example.com",
        password: "123456",
        role: "student",
        fullName: "Mehmet Öğrenci"
      },
      {
        email: "ogrenci2@example.com",
        password: "123456",
        role: "student",
        fullName: "Ayşe Öğrenci"
      }
    ];
  
    await db.collection('users').insertMany(users);
    console.log('Kullanıcılar başarıyla eklendi!');
    process.exit();
  };
  
  seedData().catch((error) => {
    console.error('Hata oluştu:', error);
    process.exit(1);
  });