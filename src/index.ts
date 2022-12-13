/* Libs */
import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import "reflect-metadata";
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
const app = express();
/* img */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./upload",
  })
);
/* cors */
app.use(
  cors({
   credentials: false,
    origin: [urlCors.secret, urlCors.img360], 
    optionsSuccessStatus: 200 
 
  })
);
//    origin: urlCors.secret
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(express.static("src"));

/* Routes */
app.use(estateRoutes);
app.use(sessionRoutes);
app.use(photosRoutes);
app.use(userRoutes);
app.use(commentsRoutes);
app.use(questioRoutes);
app.use(answerRoutes);
/* middleware err */
app.use((err: any, req: any, res: any, next: any) => {
  return res.status(400).json({
    message: err.message,
  });
});

const port = server.port || 4000;
app.listen(port, () => {
  console.log("server is running");
});
