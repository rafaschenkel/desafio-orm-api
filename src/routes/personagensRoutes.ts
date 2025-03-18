import express from "express";
import {
  atualizarPersonagem,
  criarPersonagem,
  excluirPersonagem,
  listarPersonagens,
  obterPersonagensPorId,
} from "../controllers/personagens.controller";
import createPersonagemMiddleware from "../middlewares/create-personagem.middleware";
import updatePersonagemMiddleware from "../middlewares/update-personagem.middleware";
import validateIdJogoMiddleware from "../middlewares/validateIdJogo.middleware";
import getPersonagemMiddleware from "../middlewares/get-personagem.middleware";
import validateIdPersonagemMiddleware from "../middlewares/validateIdPersonagem.middleware";

const router = express.Router({ mergeParams: true });
router.use(validateIdJogoMiddleware);
router.use(getPersonagemMiddleware);

router.get("/", listarPersonagens);
router.get(
  "/:idPersonagem",
  validateIdPersonagemMiddleware,
  obterPersonagensPorId
);
router.post(
  "/",

  createPersonagemMiddleware,
  criarPersonagem
);
router.put(
  "/:idPersonagem",
  [validateIdPersonagemMiddleware, updatePersonagemMiddleware],
  atualizarPersonagem
);
router.delete(
  "/:idPersonagem",
  validateIdPersonagemMiddleware,
  excluirPersonagem
);

export default router;
