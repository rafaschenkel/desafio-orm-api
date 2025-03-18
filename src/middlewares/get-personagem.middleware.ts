import { NextFunction, Request, Response } from "express";
import handlerError from "../config/error.handler";

import JogoRepository from "../database/jogo.repository";

const jogoRepository = new JogoRepository();

const getPersonagemMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idJogo } = req.params;

    const jogo = await jogoRepository.obterPorId(idJogo);

    if (!jogo) {
      res.status(400).json({
        ok: false,
        message:
          "Jogo não encontrado, verifique se o id do jogo foi enviado corretamente",
      });
      return;
    }

    next();
  } catch (error) {
    handlerError(error, res);
  }
};

export default getPersonagemMiddleware;
