import { MongoClient, ServerApiVersion } from 'mongodb';
import {MONGO_DB} from '$env/static/private';

const client = new MongoClient(MONGO_DB, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

export default client.db("joseki_trainer");

export async function connect() {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("joseki_trainer").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }

export async function close() {
    await client.close();
}



