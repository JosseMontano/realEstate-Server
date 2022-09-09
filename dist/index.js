"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const estateRoutes = require("./routes/estates.routes");
const sessionRoutes = require("./routes/sessions.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(estateRoutes);
app.use(sessionRoutes);
app.use((err, req, res, next) => {
    return res.json({
        message: err.message,
    });
});
app.listen(3000, () => {
    console.log("server");
});
