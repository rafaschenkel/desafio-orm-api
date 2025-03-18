import express from "express";
import {
  listarJogos,
  obterJogoPorId,
  criarJogo,
  atualizarJogo,
  excluirJogo,
} from "../controllers/jogo.controller";
import createJogoMiddleware from "../middlewares/create-jogo.middleware";
import updateJogoMiddleware from "../middlewares/update-jogo.middleware";
import validateIdMiddleware from "../middlewares/validateId.middleware";

const router = express.Router();

router.get("/", listarJogos);
router.get("/:id", validateIdMiddleware, obterJogoPorId);
router.post("/", createJogoMiddleware, criarJogo);
router.put("/:id", [validateIdMiddleware, updateJogoMiddleware], atualizarJogo);
router.delete("/:id", validateIdMiddleware, excluirJogo);

export default router;
