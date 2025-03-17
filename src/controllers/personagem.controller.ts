import { CreatePersonagemDto } from "./../dtos/create-personagem.dto";
import { Request, Response } from "express";
import { PersonagemRepository } from "../database/personagem.repository";
import { UpdateJogoDto } from "../dtos/update-jogo.dto";

const personagemRepository = new PersonagemRepository();

export const listarPersonagens = async (req: Request, res: Response) => {
  try {
    const { includeJogo } = req.query;
    const personagens = await personagemRepository.listar(
      includeJogo === "true" ? true : false
    );
    res
      .status(200)
      .json({ message: "Personagens listados com sucesso", data: personagens });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const obterPersonagensPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { includeJogo } = req.query;
    const personagem = await personagemRepository.obterPorId(
      id,
      includeJogo === "true" ? true : false
    );
    if (!personagem) {
      res.status(404).json({ message: "Personagem não encontrado" });
      return;
    }
    res
      .status(200)
      .json({ message: "Personagem listado com sucesso", data: personagem });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const criarPersonagem = async (req: Request, res: Response) => {
  try {
    const { ...personagem }: CreatePersonagemDto = req.body;
    const response = await personagemRepository.criar(personagem);
    res.status(201).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const atualizarPersonagem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const personagemExist = await personagemRepository.obterPorId(id);
    if (!personagemExist) {
      res.status(404).json({ message: "Personagem não encontrado" });
      return;
    }
    const { ...personagem }: UpdateJogoDto = req.body;
    const response = await personagemRepository.atualizar(id, personagem);
    res.status(200).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const excluirPersonagem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const personagemExist = await personagemRepository.obterPorId(id);
    if (!personagemExist) {
      res
        .status(404)
        .json({ message: "Personagem não encontrado ou já excluído" });
      return;
    }
    const response = await personagemRepository.deletar(id);
    res.status(200).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};
