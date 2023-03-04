import {Collection, Document, MongoClient} from "mongodb"

export class MongoDB {
    async client<TSchema extends Document>(collectionName: string): Promise<Collection> {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.nx8hr0s.mongodb.net`;
        const client = await new MongoClient(uri).connect();
        return client.db('asasii').collection(collectionName);
    }

}