"use strict";
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
var cookieParser = require("cookie-parser");
/* files Routes */
const estateRoutes = require("./routes/estates.routes");
const sessionRoutes = require("./routes/sessions.routes");
const photosRoutes = require("./routes/photos..routes");
const { urlCors, server } = require("./config");
const userRoutes = require("./routes/users.routes");
const commentsRoutes = require("./routes/comments.routes");
const questioRoutes = require("./routes/questions.routes");
const answerRoutes = require("./routes/answers.routes");
/* Setup Express */
const app = (0, express_1.default)();
/* img */
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "./upload",
}));
/* cors */
app.use((0, cors_1.default)({
    credentials: true,
    origin: urlCors.secret,
}));
//    origin: urlCors.secret
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(express_1.default.static('src'));
/* Routes */
app.use(estateRoutes);
app.use(sessionRoutes);
app.use(photosRoutes);
app.use(userRoutes);
app.use(commentsRoutes);
app.use(questioRoutes);
app.use(answerRoutes);
/* middleware err */
app.use((err, req, res, next) => {
    return res.status(400).json({
        message: err.message,
    });
});
const port = server.port || 4000;
app.listen(port, () => {
    console.log("server is running");
});
