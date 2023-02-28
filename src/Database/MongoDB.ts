import {Db, MongoClient} from "mongodb"

require('dotenv').config();
export class MongoDB {
    async client(): Promise<Db> {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.nx8hr0s.mongodb.net`;
        const client = await new MongoClient(uri).connect();
        return client.db('asasii');
    }
}