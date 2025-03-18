import { NextFunction, Request, Response } from "express";
import JogoRepository from "../database/jogo.repository";
import validateUuid from "../utils/validateUuid.utils";
import CreatePersonagemDto from "../dtos/create-personagem.dto";
import handlerError from "../config/error.handler";

const jogoRepository = new JogoRepository();

const createPersonagemMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idJogo } = req.params;
    const { ...personagem }: CreatePersonagemDto = req.body;

    if (Object.keys(personagem).length === 0) {
      res
        .status(400)
        .json({ ok: false, message: "Nenhum campo foi enviado no body" });
      return;
    }

    if (!idJogo || !validateUuid(idJogo)) {
      res.status(400).json({
        ok: false,
        message:
          "O id do jogo é obrigatório ou está em um formato inválido, deve ser um uuidV4",
      });
      return;
    }

    const jogoExist = await jogoRepository.obterPorId(idJogo);
    if (!jogoExist) {
      res.status(404).json({ ok: false, message: "Jogo não encontrado" });
      return;
    }

    if (
      !personagem.nome ||
      typeof personagem.nome !== "string" ||
      personagem.nome === ""
    ) {
      res.status(400).json({
        ok: false,
        message:
          "O nome do personagem é obrigatório ou está em um formato inválido",
      });
      return;
    }

    if (
      !personagem.idade ||
      typeof personagem.idade !== "number" ||
      personagem.idade <= 0
    ) {
      res.status(400).json({
        ok: false,
        message:
          "A idade do personagem é obrigatória ou está em um formato inválido",
      });
      return;
    }

    if (
      !personagem.forca ||
      typeof personagem.forca !== "number" ||
      personagem.forca < 0
    ) {
      res.status(400).json({
        ok: false,
        message:
          "A força do personagem é obrigatória ou está em um formato inválido",
      });
      return;
    }

    if (
      !personagem.inteligencia ||
      typeof personagem.inteligencia !== "number" ||
      personagem.inteligencia < 0
    ) {
      res.status(400).json({
        ok: false,
        message:
          "A inteligencia do personagem é obrigatória ou está em um formato inválido",
      });
      return;
    }

    if (
      !personagem.habilidades ||
      typeof personagem.habilidades !== "string" ||
      personagem.habilidades === ""
    ) {
      res.status(400).json({
        ok: false,
        message:
          "As habilidades do personagem são obrigatórias ou estão em um formato inválido",
      });
      return;
    }

    next();
  } catch (error) {
    handlerError(error, res);
    return;
  }
};

export default createPersonagemMiddleware;
