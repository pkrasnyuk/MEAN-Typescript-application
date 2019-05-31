import * as mongoose from "mongoose"

import BaseConfig from "./../../core/config/baseConfig"

export default class MongoAccess {

    private readonly dbConnection: mongoose.Connection;

    constructor() {
        (mongoose as any).Promise = global.Promise;
        const connectionString = BaseConfig.dbConnectionString;
        this.dbConnection = mongoose.createConnection(connectionString);
    }

    get connection() {
        return this.dbConnection;
    }
}