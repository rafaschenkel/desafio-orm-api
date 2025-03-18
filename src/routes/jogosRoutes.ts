import express from "express";
import {
  listarJogos,
  obterJogoPorId,
  criarJogo,
  atualizarJogo,
  excluirJogo,
} from "../controllers/jogos.controller";
import createJogoMiddleware from "../middlewares/create-jogo.middleware";
import updateJogoMiddleware from "../middlewares/update-jogo.middleware";
import validateIdJogoMiddleware from "../middlewares/validateIdJogo.middleware";

const router = express.Router({ mergeParams: true });

router.get("/", listarJogos);
router.get("/:idJogo", validateIdJogoMiddleware, obterJogoPorId);
router.post("/", createJogoMiddleware, criarJogo);
router.put(
  "/:idJogo",
  [validateIdJogoMiddleware, updateJogoMiddleware],
  atualizarJogo
);
router.delete("/:idJogo", validateIdJogoMiddleware, excluirJogo);

export default router;
