import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017'

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect();
const db = client.db('exemple');

export default db;