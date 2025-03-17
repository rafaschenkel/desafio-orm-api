import { NextFunction, Request, Response } from "express";
import { UpdatePersonagemDto } from "../dtos/update-personagem.dto";
import verifyObject from "../utils/verififyObject.utils";
import { PersonagemRepository } from "../database/personagem.repository";

const personagemRepository = new PersonagemRepository();

export async function updatePersonagemMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { ...personagem }: UpdatePersonagemDto = req.body;

    if (Object.keys(personagem).length === 0) {
      res.status(400).json({ message: "Nenhum campo foi enviado no body" });
      return;
    }

    const personagemExist = await personagemRepository.obterPorId(id);
    if (!personagemExist) {
      res.status(404).json({ message: "Personagem não encontrado" });
      return;
    }

    if (
      (verifyObject(personagem, "nome") &&
        typeof personagem.nome !== "string") ||
      personagem.nome === ""
    ) {
      res.status(400).json({
        message: "O nome do personagem está em um formato inválido",
      });
      return;
    }

    if (
      (verifyObject(personagem, "idade") &&
        personagem.idade !== undefined &&
        personagem.idade <= 0) ||
      (personagem.idade && typeof personagem.idade !== "number")
    ) {
      res.status(400).json({
        message: "A idade do personagem está em um formato inválido",
      });
      return;
    }

    if (
      (verifyObject(personagem, "forca") &&
        personagem.forca !== undefined &&
        personagem.forca < 0) ||
      (personagem.forca && typeof personagem.forca !== "number")
    ) {
      res.status(400).json({
        message: "A forca do personagem está em um formato inválido",
      });
      return;
    }

    if (
      (verifyObject(personagem, "inteligencia") &&
        personagem.inteligencia !== undefined &&
        personagem.inteligencia < 0) ||
      (personagem.inteligencia && typeof personagem.inteligencia !== "number")
    ) {
      res.status(400).json({
        message: "A inteligencia do personagem está em um formato inválido",
      });
      return;
    }

    if (
      (verifyObject(personagem, "habilidades") &&
        typeof personagem.habilidades !== "string") ||
      personagem.habilidades === ""
    ) {
      res.status(400).json({
        message: "As habilidades do personagem estão em um formato inválido",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
