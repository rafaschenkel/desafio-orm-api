import { NextFunction, Request, Response } from "express";
import JogoRepository from "../database/jogo.repository";
import UpdateJogoDto from "../dtos/update-jogo.dto";
import isValidDate from "../utils/validateDate.utils";
import verifyObject from "../utils/verififyObject.utils";
import handlerError from "../config/error.handler";

const jogoRepository = new JogoRepository();

const updateJogoMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idJogo } = req.params;
    const { ...jogo }: UpdateJogoDto = req.body;

    if (Object.keys(jogo).length === 0) {
      res
        .status(400)
        .json({ ok: false, message: "Nenhum campo foi enviado no body" });
      return;
    }

    const jogoExist = await jogoRepository.obterPorId(idJogo);
    if (!jogoExist) {
      res.status(404).json({ ok: false, message: "Jogo não encontrado" });
      return;
    }

    if (
      (verifyObject(jogo, "nome") && typeof jogo.nome !== "string") ||
      jogo.nome === ""
    ) {
      res.status(400).json({
        ok: false,
        message: "O nome do jogo está em um formato inválido",
      });
      return;
    }

    if (
      (verifyObject(jogo, "genero") && typeof jogo.genero !== "string") ||
      jogo.genero === ""
    ) {
      res.status(400).json({
        ok: false,
        message: "O gênero do jogo está em um formato inválido",
      });
      return;
    }

    if (
      (verifyObject(jogo, "preco") &&
        jogo.preco !== undefined &&
        jogo.preco < 0) ||
      (jogo.preco && typeof jogo.preco !== "number")
    ) {
      res.status(400).json({
        ok: false,
        message: "O preco do jogo está em um formato inválido",
      });
      return;
    }

    if (
      (verifyObject(jogo, "tamanho") &&
        jogo.tamanho !== undefined &&
        jogo.tamanho <= 0) ||
      (jogo.tamanho && typeof jogo.tamanho !== "number")
    ) {
      res.status(400).json({
        ok: false,
        message: "O tamanho do jogo está em um formato inválido",
      });
      return;
    }

    if (verifyObject(jogo, "dtLancamento") && !isValidDate(jogo.dtLancamento)) {
      res.status(400).json({
        ok: false,
        message: "A data de lancamento do jogo está em um formato inválido",
      });
      return;
    }

    if (
      verifyObject(jogo, "multiplayer") &&
      typeof jogo.multiplayer !== "boolean"
    ) {
      res.status(400).json({
        ok: false,
        message: "O multiplayer do jogo está em um formato inválido",
      });
      return;
    }

    next();
  } catch (error) {
    handlerError(error, res);
  }
};

export default updateJogoMiddleware;
