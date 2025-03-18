import { NextFunction, Request, Response } from "express";
import PersonagemRepository from "../database/personagem.repository";
import verifyObject from "../utils/verififyObject.utils";
import UpdatePersonagemDto from "../dtos/update-personagem.dto";
import handlerError from "../config/error.handler";

const personagemRepository = new PersonagemRepository();

const updatePersonagemMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { idPersonagem, idJogo } = req.params;
    const { ...personagem }: UpdatePersonagemDto = req.body;

    if (Object.keys(personagem).length === 0) {
      res
        .status(400)
        .json({ ok: false, message: "Nenhum campo foi enviado no body" });
      return;
    }

    const personagemExist = await personagemRepository.obterPorId(
      idJogo,
      idPersonagem
    );
    if (!personagemExist) {
      res.status(404).json({ ok: false, message: "Personagem não encontrado" });
      return;
    }

    if (
      (verifyObject(personagem, "nome") &&
        typeof personagem.nome !== "string") ||
      personagem.nome === ""
    ) {
      res.status(400).json({
        ok: false,
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
        ok: false,
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
        ok: false,
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
        ok: false,
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
        ok: false,
        message: "As habilidades do personagem estão em um formato inválido",
      });
      return;
    }

    next();
  } catch (error) {
    handlerError(error, res);
  }
};

export default updatePersonagemMiddleware;
