import {Collection, Document, MongoClient} from "mongodb"

export class MongoDB {
    private connection?: MongoClient;

    async client<TSchema extends Document>(collectionName: string): Promise<Collection> {
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@asasii-a43b7503.mongo.ondigitalocean.com`;
        this.connection = await new MongoClient(uri).connect();
        return this.connection.db('asasii').collection(collectionName);
    }

    closeConnection(): () => void {
        return async () => {
            await this.connection?.close();
        };
    }
}