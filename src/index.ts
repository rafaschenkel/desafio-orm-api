import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import routes from "./routes/routes";
import jsonMiddleware from "./middlewares/json.middleware";

dotEnv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(jsonMiddleware);
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
