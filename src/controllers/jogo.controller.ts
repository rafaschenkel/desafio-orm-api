import { Request, Response } from "express";
import { JogoRepository } from "../database/jogo.repository";
import { CreateJogoDto } from "../dtos/create-jogo.dto";
import { UpdateJogoDto } from "../dtos/update-jogo.dto";

const jogoRepository = new JogoRepository();

export const listarJogos = async (req: Request, res: Response) => {
  try {
    const { includePersonagens } = req.query;
    const jogos = await jogoRepository.listar(
      includePersonagens === "true" ? true : false
    );
    res
      .status(200)
      .json({ message: "Jogos listados com sucesso", data: jogos });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const obterJogoPorId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { includePersonagens } = req.query;
    const jogo = await jogoRepository.obterPorId(
      id,
      includePersonagens === "true" ? true : false
    );
    if (!jogo) {
      res.status(404).json({ message: "Jogo não encontrado" });
      return;
    }
    res.status(200).json({ message: "Jogo listado com sucesso", data: jogo });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const criarJogo = async (req: Request, res: Response) => {
  try {
    const { ...jogo }: CreateJogoDto = req.body;
    const jogoExist = await jogoRepository.obterPorNome(jogo.nome);
    if (jogoExist) {
      res.status(409).json({ message: "Jogo já cadastrado" });
      return;
    }

    // Garante que o campo dtLancamento seja do tipo Date ISO-8601
    jogo.dtLancamento = new Date(jogo.dtLancamento);

    const response = await jogoRepository.criar(jogo);
    res.status(201).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const atualizarJogo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { ...jogo }: UpdateJogoDto = req.body;

    // Garante que se o campo dtLancamento for enviado no body, seja do tipo Date ISO-8601
    jogo.dtLancamento ? (jogo.dtLancamento = new Date(jogo.dtLancamento)) : "";

    const response = await jogoRepository.atualizar(id, jogo);
    res.status(200).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};

export const excluirJogo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jogoExist = await jogoRepository.obterPorId(id);
    if (!jogoExist) {
      res.status(404).json({ message: "Jogo não encontrado" });
      return;
    }
    const response = await jogoRepository.deletar(id);
    res.status(200).json({ message: response });
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
};
