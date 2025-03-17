import { CreateJogoDto } from "./../dtos/create-jogo.dto";
import { NextFunction, Request, Response } from "express";
import { JogoRepository } from "../database/jogo.repository";
import isValidDate from "../utils/validateDate.utils";

const jogoRepository = new JogoRepository();

export default async function createJogoMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { ...jogo }: CreateJogoDto = req.body;

    if (Object.keys(jogo).length === 0) {
      res.status(400).json({ message: "Nenhum campo foi enviado no body" });
      return;
    }

    if (!jogo.nome || typeof jogo.nome !== "string" || jogo.nome === "") {
      res.status(400).json({
        message: "O nome do jogo é obrigatório ou está em um formato inválido",
      });
      return;
    }

    const jogoExist = await jogoRepository.obterPorNome(jogo.nome);

    if (jogoExist) {
      res.status(409).json({ message: "Jogo já cadastrado" });
      return;
    }

    if (!jogo.genero || typeof jogo.genero !== "string" || jogo.genero === "") {
      res.status(400).json({
        message:
          "O gênero do jogo é obrigatório ou está em um formato inválido",
      });
      return;
    }

    if (!jogo.preco || typeof jogo.preco !== "number" || jogo.preco < 0) {
      res.status(400).json({
        message: "O preco do jogo é obrigatório ou está em um formato inválido",
      });
      return;
    }

    if (
      !jogo.tamanho ||
      typeof jogo.tamanho !== "number" ||
      jogo.tamanho <= 0
    ) {
      res.status(400).json({
        message:
          "O tamanho do jogo é obrigatório ou está em um formato inválido",
      });
      return;
    }

    if (!jogo.dtLancamento || !isValidDate(jogo.dtLancamento)) {
      res.status(400).json({
        message:
          "A data de lancamento do jogo é obrigatório ou está em um formato inválido",
      });
      return;
    }

    if (typeof jogo.multiplayer !== "boolean") {
      res.status(400).json({
        message:
          "O multiplayer do jogo é obrigatório ou está em um formato inválido",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
