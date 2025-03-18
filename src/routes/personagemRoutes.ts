import express from "express";
import {
  atualizarPersonagem,
  criarPersonagem,
  excluirPersonagem,
  listarPersonagens,
  obterPersonagensPorId,
} from "../controllers/personagem.controller";
import createPersonagemMiddleware from "../middlewares/create-personagem.middleware";
import updatePersonagemMiddleware from "../middlewares/update-personagem.middleware";
import validateIdMiddleware from "../middlewares/validateId.middleware";

const router = express.Router();

router.get("/", listarPersonagens);
router.get("/:id", validateIdMiddleware, obterPersonagensPorId);
router.post("/", createPersonagemMiddleware, criarPersonagem);
router.put(
  "/:id",
  [validateIdMiddleware, updatePersonagemMiddleware],
  atualizarPersonagem
);
router.delete("/:id", validateIdMiddleware, excluirPersonagem);

export default router;
