import { NextFunction, Request, Response } from "express";
import { JogoRepository } from "../database/jogo.repository";
import { CreatePersonagemDto } from "../dtos/create-personagem.dto";
import { validateUuid } from "../utils/validateUuid.utils";

const jogoRepository = new JogoRepository();

export default async function createPersonagemMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { ...personagem }: CreatePersonagemDto = req.body;

  if (Object.keys(personagem).length === 0) {
    res.status(400).json({ message: "Nenhum campo foi enviado no body" });
    return;
  }

  if (!personagem.idJogo || !validateUuid(personagem.idJogo)) {
    res.status(400).json({
      message:
        "O id do jogo é obrigatório ou está em um formato inválido, deve ser um uuidV4",
    });
    return;
  }

  const jogoExist = await jogoRepository.obterPorId(personagem.idJogo);
  if (!jogoExist) {
    res.status(404).json({ message: "Jogo não encontrado" });
    return;
  }

  if (
    !personagem.nome ||
    typeof personagem.nome !== "string" ||
    personagem.nome === ""
  ) {
    res.status(400).json({
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
      message:
        "As habilidades do personagem são obrigatórias ou estão em um formato inválido",
    });
    return;
  }

  next();
}
