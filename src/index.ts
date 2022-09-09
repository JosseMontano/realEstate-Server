import express from "express";
import morgan from "morgan";
import cors from 'cors'
const estateRoutes = require("./routes/estates.routes");
const sessionRoutes = require("./routes/sessions.routes")


const app = express();
app.use(cors({ origin:"*"}))
app.use(morgan("dev"));
app.use(express.json());

app.use(estateRoutes);
app.use(sessionRoutes);

app.use((err: any, req: any, res: any, next: any) => {
  return res.json({
    message: err.message,
  });
});
const port = process.env.PORT || 3000
app.listen(3000, () => {
  console.log("server");
});
