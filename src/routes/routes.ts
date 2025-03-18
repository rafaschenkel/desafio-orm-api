import express from "express";
import jogosRoutes from "./jogosRoutes";
import personagensRoutes from "./personagensRoutes";

const router = express.Router({ mergeParams: true });

// Usa a rota /jogos normalmente
router.use("/jogos", jogosRoutes);

// Aninhando personagens dentro de jogos
router.use("/jogos/:idJogo/personagens", personagensRoutes);

export default router;
