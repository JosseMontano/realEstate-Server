/* files Routes */
const estateRoutes = require("./routes/realEstate.routes");
const sessionRoutes = require("./routes/sessions.routes");
const photosRoutes = require("./routes/photos..routes");

const userRoutes = require("./routes/users.routes");
const commentsRoutes = require("./routes/comments.routes");
const questioRoutes = require("./routes/questions.routes");
const answerRoutes = require("./routes/answers.routes");

/* Routes */
export const metRoute = (app: any) => {
  app.use(estateRoutes);
  app.use(sessionRoutes);
  app.use(photosRoutes);
  app.use(userRoutes);
  app.use(commentsRoutes);
  app.use(questioRoutes);
  app.use(answerRoutes);
};
