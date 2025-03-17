import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import dotEnv from "dotenv";
import personagemRoutes from "./routes/personagemRoutes";
import jogoRoutes from "./routes/jogoRoutes";

dotEnv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  (err: SyntaxError, _req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) {
      // Erro de JSON malformado
      res.status(400).json({
        error: "Corpo da requisição não é um JSON válido ou está vazio.",
      });
      return;
    }
    next(); // Se o erro não for de sintaxe, continue o fluxo normal
  }
);

app.use("/personagem", personagemRoutes);
app.use("/jogo", jogoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
