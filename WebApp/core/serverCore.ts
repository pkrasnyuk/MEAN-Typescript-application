import * as express from "express"
import * as favicon from "serve-favicon"
import * as bodyParser from "body-parser"
import * as path from "path"
import * as compression from "compression"
import * as logger from "morgan"
import * as fs from "fs";
import * as methodOverride from "method-override"
import * as cors from "cors";

const swaggerUi = require('swagger-ui-express');

import apiUsersRoutes from "./../api/routes/usersRoutes"
import BaseConfig from "./config/baseConfig"

class ServerCore {

    express: express.Application;

    private usersRoutes = apiUsersRoutes;
    private swaggerDocument = require("./../api/swagger.json");
    private showExplorer = true;

    constructor() {
        this.express = express();

        this.middleware();
        this.routes();
    }

    private middleware(): void {
        const accessLogStream = fs.createWriteStream("./server.log", { flags: "a" });
        const appLogger = logger("combined", { stream: accessLogStream });
        this.express.use(appLogger);

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));

        this.express.use(methodOverride("X-HTTP-Method"));
        this.express.use(methodOverride("X-HTTP-Method-Override"));
        this.express.use(methodOverride("X-Method-Override"));
        this.express.use(methodOverride("_method"));
        this.express.use(compression());
        this.express.use(cors());

        this.express.use((error: any, request: any, response: any, next: any) => {
            if (response.headersSent) {
                next(error);
            }

            if (error) {
                const data = `  error stack -> ${error.stack}`;
                fs.appendFile("./server.log", data + "\n", null, null);
                response.status(500).send({ code: 500, message: error.message });
            }
        });

        if (this.swaggerDocument) {
            this.swaggerDocument.host = `${BaseConfig.host}`;
        }
    }

    private routes(): void {
        this.express.use(favicon(path.join(__dirname, "/../public/img/favicon.ico")));
        this.express.use(express.static(path.join(__dirname, "/../public")));
        this.express.use("/node_modules", express.static(path.join(__dirname, "/../node_modules")));
        this.express.use("/app", express.static(path.join(__dirname, "/../app")));
        
        this.usersRoutes(this.express);
        this.express.use("/api", swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, this.showExplorer));

        this.express.get("*",
            (req: express.Request, res: express.Response) => {
                res.sendFile("index.html", { root: path.join(__dirname, "./../public") });
            });
    }
}

export default new ServerCore().express as any;