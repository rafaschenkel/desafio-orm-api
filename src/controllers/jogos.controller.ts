import { Request, Response } from "express";
import JogoRepository from "../database/jogo.repository";
import CreateJogoDto from "../dtos/create-jogo.dto";
import UpdateJogoDto from "../dtos/update-jogo.dto";
import handlerError from "../config/error.handler";

const jogoRepository = new JogoRepository();

const listarJogos = async (req: Request, res: Response) => {
  try {
    const { includePersonagens } = req.query;
    const result = await jogoRepository.listar(
      includePersonagens === "true" ? true : false
    );
    res
      .status(200)
      .json({ ok: true, message: "Jogos listados com sucesso", data: result });
  } catch (error: any) {
    handlerError(error, res);
  }
};

const obterJogoPorId = async (req: Request, res: Response) => {
  try {
    const { idJogo } = req.params;
    const { includePersonagens } = req.query;
    const result = await jogoRepository.obterPorId(
      idJogo,
      includePersonagens === "true" ? true : false
    );
    if (!result) {
      res.status(404).json({ ok: false, message: "Jogo não encontrado" });
      return;
    }
    res
      .status(200)
      .json({ ok: true, message: "Jogo listado com sucesso", data: result });
  } catch (error: any) {
    handlerError(error, res);
  }
};

const criarJogo = async (req: Request, res: Response) => {
  try {
    const { ...jogo }: CreateJogoDto = req.body;
    const jogoExist = await jogoRepository.obterPorNome(jogo.nome);
    if (jogoExist) {
      res.status(409).json({ ok: false, message: "Jogo já cadastrado" });
      return;
    }

    // Garante que o campo dtLancamento seja do tipo Date ISO-8601
    jogo.dtLancamento = new Date(jogo.dtLancamento);

    const result = await jogoRepository.criar(jogo);
    res
      .status(201)
      .json({ ok: true, message: "Jogo criado com sucesso", data: result });
  } catch (error: any) {
    handlerError(error, res);
  }
};

const atualizarJogo = async (req: Request, res: Response) => {
  try {
    const { idJogo } = req.params;
    const { ...jogo }: UpdateJogoDto = req.body;

    // Garante que se o campo dtLancamento for enviado no body, seja do tipo Date ISO-8601
    jogo.dtLancamento ? (jogo.dtLancamento = new Date(jogo.dtLancamento)) : "";

    const result = await jogoRepository.atualizar(idJogo, jogo);
    res
      .status(200)
      .json({ ok: true, message: "Jogo atualizado com sucesso", data: result });
  } catch (error: any) {
    handlerError(error, res);
  }
};

const excluirJogo = async (req: Request, res: Response) => {
  try {
    const { idJogo } = req.params;
    const includePersonagens = true;
    const jogoExist = await jogoRepository.obterPorId(
      idJogo,
      includePersonagens
    );
    if (!jogoExist) {
      res.status(404).json({ ok: false, message: "Jogo não encontrado" });
      return;
    }

    if (jogoExist.personagens.length > 0) {
      res.status(409).json({
        ok: false,
        message:
          "Não é possível excluir o jogo pois ele possui personagens cadastrados",
      });
      return;
    }

    const result = await jogoRepository.deletar(idJogo);
    res
      .status(200)
      .json({ ok: true, message: "Jogo excluido com sucesso", data: result });
  } catch (error: any) {
    handlerError(error, res);
  }
};

export { listarJogos, obterJogoPorId, criarJogo, atualizarJogo, excluirJogo };
