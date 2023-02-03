"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Libs */
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
require("reflect-metadata");
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const routes_1 = require("./routes");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const http_1 = require("http");
const { urlCors, server } = require("./config");
var cookieParser = require("cookie-parser");
/* Setup Express */
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        /* img */
        app.use((0, express_fileupload_1.default)({
            useTempFiles: true,
            tempFileDir: "./upload",
        }));
        /* cors */
        app.use((0, cors_1.default)({
            credentials: true,
            origin: [urlCors.secret],
        }));
        //    origin: urlCors.secret
        app.use((0, morgan_1.default)("dev"));
        app.use(express_1.default.json());
        app.use(cookieParser());
        app.use(express_1.default.static("src"));
        //routes
        (0, routes_1.metRoute)(app);
        /* middleware err */
        app.use((err, req, res, next) => {
            return res.status(400).json({
                message: err.message,
            });
        });
        const port = server.port || 3000;
        const portCors = server.portCors || 3002;
        const serverWS = new ws_1.WebSocketServer({
            server: httpServer,
            path: "/graphql",
        });
        (0, ws_2.useServer)({ schema: schema_1.schema }, serverWS);
        httpServer.listen(port, () => {
            //apollo
            app.use("/graphql", (0, express_graphql_1.graphqlHTTP)((req) => ({
                schema: schema_1.schema,
                graphiql: {
                    headerEditorEnabled: true,
                },
            })));
            console.log(`Listening to port ${port}`);
            console.log(serverWS.options.port);
        });
    });
}
start();
