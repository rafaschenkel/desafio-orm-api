import { handlerError } from "../config/error.handler";
import { prisma } from "../config/prisma.config";
import { CreateJogoDto } from "../dtos/create-jogo.dto";
import { UpdateJogoDto } from "../dtos/update-jogo.dto";

export class JogoRepository {
  public async listar(includePersonagens?: boolean) {
    try {
      const jogos = await prisma.jogo.findMany({
        include: {
          personagens: includePersonagens,
        },
      });
      return jogos;
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async obterPorId(id: string, includePersonagens?: boolean) {
    try {
      const jogo = await prisma.jogo.findUnique({
        where: {
          id,
        },
        include: {
          personagens: includePersonagens,
        },
      });
      return jogo;
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async obterPorNome(nome: string) {
    try {
      const jogo = await prisma.jogo.findUnique({
        where: {
          nome,
        },
      });
      return jogo;
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async criar(jogo: CreateJogoDto) {
    try {
      await prisma.jogo.create({
        data: jogo,
      });
      return "Jogo criado com sucesso";
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async atualizar(id: string, jogo: UpdateJogoDto) {
    try {
      await prisma.jogo.update({
        where: {
          id,
        },
        data: jogo,
      });
      return "Jogo atualizado com sucesso";
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async deletar(id: string) {
    try {
      await prisma.jogo.delete({
        where: {
          id,
        },
      });
      return "Jogo deletado com sucesso";
    } catch (error: any) {
      handlerError(error);
    }
  }
}
