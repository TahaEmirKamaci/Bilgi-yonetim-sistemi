const userSchema = new mongoose.Schema({
    email: String,
    password: String, 
    role: String, 
    fullName: String,
    createdAt: { type: Date, default: Date.now }
  });
  
  
  const users = [
    {
      email: "ogretmen@example.com",
      password: "$2a$10$hashedpassword...", // "123456" şifrelenmiş hali
      role: "teacher",
      fullName: "Ahmet Öğretmen"
    },
    {
      email: "ogrenci@example.com",
      password: "$2a$10$hashedpassword...", // "123456" şifrelenmiş hali
      role: "student",
      fullName: "Mehmet Öğrenci"
    }
  ];