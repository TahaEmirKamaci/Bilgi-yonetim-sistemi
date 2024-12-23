import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)
let cachedClient = null;

export async function connectDB() {
  if (cachedClient) {
    return cachedClient;
  }

  console.log(MONGODB_URI)
  const client = await MongoClient.connect(MONGODB_URI);
  cachedClient = client.db();
  return cachedClient;
}