"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metRoute = void 0;
/* files Routes */
const estateRoutes = require("./routes/realEstate.routes");
const sessionRoutes = require("./routes/sessions.routes");
const photosRoutes = require("./routes/photos..routes");
const userRoutes = require("./routes/users.routes");
const questioRoutes = require("./routes/questions.routes");
const answerRoutes = require("./routes/answers.routes");
/* Routes */
const metRoute = (app) => {
    app.use(estateRoutes);
    app.use(sessionRoutes);
    app.use(photosRoutes);
    app.use(userRoutes);
    app.use(questioRoutes);
    app.use(answerRoutes);
};
exports.metRoute = metRoute;
