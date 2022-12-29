const mongoose = require('mongoose');

class Database {

    connection = mongoose.connection;

    constructor() {

        try {
            this.connection
                .on('open', console.info.bind(console, '[+] Database connection: open!'))
                .on('close', console.info.bind(console, '[+] Database connection: close!'))
        } catch (error) {
            console.error(error);
        }
    }

    async connect() {
        try {
            const MONGO_URL = process.env.MONGODB_HOST
            mongoose.set('strictQuery', false)
            await mongoose.connect(
                MONGO_URL,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            );
        } catch (error) {
            console.error(error)
        }
    }

    async close() {
        try {
            await this.connection.close();
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new Database();