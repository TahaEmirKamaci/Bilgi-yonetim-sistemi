import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function db() {
  if (!client.isConnected) await client.connect();
  return client.db('bilgi-yonetim'); // Veritabanı adı
}
