import express from "express";
import cors from "cors";
import dotEnv from "dotenv";
import personagemRoutes from "./routes/personagemRoutes";
import jogoRoutes from "./routes/jogoRoutes";
import jsonMiddleware from "./middlewares/json.middleware";

dotEnv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(jsonMiddleware);
app.use("/personagem", personagemRoutes);
app.use("/jogo", jogoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
