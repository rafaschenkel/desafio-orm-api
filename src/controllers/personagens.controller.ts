import { Request, Response } from "express";
import PersonagemRepository from "../database/personagem.repository";
import CreatePersonagemDto from "../dtos/create-personagem.dto";
import UpdateJogoDto from "../dtos/update-jogo.dto";
import handlerError from "../config/error.handler";
import { validate } from "uuid";

const personagemRepository = new PersonagemRepository();

const listarPersonagens = async (req: Request, res: Response) => {
  try {
    const { idJogo } = req.params;
    const result = await personagemRepository.listar(idJogo);
    res.status(200).json({
      ok: true,
      message: "Personagens listados com sucesso",
      data: result,
    });
  } catch (error: any) {
    handlerError(error, res);
  }
};

const obterPersonagensPorId = async (req: Request, res: Response) => {
  try {
    const { idPersonagem, idJogo } = req.params;

    if (!validate(idPersonagem)) {
      res.status(400).json({
        ok: false,
        message: "O campo idPersonagem precisa ser enviado e ser um uuidV4",
      });
      return;
    }

    const result = await personagemRepository.obterPorId(idJogo, idPersonagem);
    if (!result) {
      res.status(404).json({ ok: false, message: "Personagem não encontrado" });
      return;
    }
    res.status(200).json({
      ok: true,
      message: "Personagem listado com sucesso",
      data: result,
    });
  } catch (error: any) {
    handlerError(error, res);
  }
};

const criarPersonagem = async (req: Request, res: Response) => {
  try {
    const { idJogo } = req.params;
    const { ...personagem }: CreatePersonagemDto = req.body;
    const result = await personagemRepository.criar(idJogo, personagem);
    res.status(201).json({
      ok: true,
      message: "Personagem criado com sucesso",
      data: result,
    });
  } catch (error: any) {
    handlerError(error, res);
  }
};

const atualizarPersonagem = async (req: Request, res: Response) => {
  try {
    const { idPersonagem, idJogo } = req.params;
    const personagemExist = await personagemRepository.obterPorId(
      idJogo,
      idPersonagem
    );
    if (!personagemExist) {
      res.status(404).json({ ok: false, message: "Personagem não encontrado" });
      return;
    }
    const { ...personagem }: UpdateJogoDto = req.body;
    const result = await personagemRepository.atualizar(
      idJogo,
      idPersonagem,
      personagem
    );
    res.status(200).json({
      ok: true,
      message: "Personagem atualizado com sucesso",
      data: result,
    });
  } catch (error: any) {
    handlerError(error, res);
  }
};

const excluirPersonagem = async (req: Request, res: Response) => {
  try {
    const { idPersonagem, idJogo } = req.params;
    const personagemExist = await personagemRepository.obterPorId(
      idJogo,
      idPersonagem
    );
    if (!personagemExist) {
      res.status(404).json({
        ok: false,
        message: "Personagem não encontrado ou já excluído",
      });
      return;
    }
    const result = await personagemRepository.deletar(idJogo, idPersonagem);
    res.status(200).json({
      ok: true,
      message: "Personagem excluido com sucesso",
      data: result,
    });
  } catch (error: any) {
    handlerError(error, res);
  }
};

export {
  listarPersonagens,
  obterPersonagensPorId,
  criarPersonagem,
  atualizarPersonagem,
  excluirPersonagem,
};
