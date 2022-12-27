/* Libs */
import express from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import "reflect-metadata";
import { graphqlHTTP } from "express-graphql";

import { schema } from "./schema";
import { metRoute } from "./routes";
const { urlCors, server } = require("./config");

var cookieParser = require("cookie-parser");

/* Setup Express */
const app = express();

async function start() {
  //apollo
  app.use(
    "/graphql",
    graphqlHTTP({
      graphiql: true,
      schema,
    })
  );

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
      credentials: true,
      origin: [urlCors.secret, urlCors.img360],
      /*     origin: urlCors.secret, */
    })
  );
  //    origin: urlCors.secret
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(cookieParser());

  app.use(express.static("src"));

  //routes
  metRoute(app);

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
}

start();
