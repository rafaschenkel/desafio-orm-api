import { prisma } from "../config/prisma.config";
import CreateJogoDto from "../dtos/create-jogo.dto";
import UpdateJogoDto from "../dtos/update-jogo.dto";

class JogoRepository {
  public async listar(includePersonagens?: boolean) {
    return await prisma.jogo.findMany({
      include: {
        personagens: includePersonagens,
      },
    });
  }

  public async obterPorId(id: string, includePersonagens?: boolean) {
    return await prisma.jogo.findUnique({
      where: {
        id,
      },
      include: {
        personagens: includePersonagens,
      },
    });
  }

  public async obterPorNome(nome: string) {
    return await prisma.jogo.findUnique({
      where: {
        nome,
      },
    });
  }

  public async criar(jogo: CreateJogoDto) {
    return await prisma.jogo.create({
      data: jogo,
    });
  }

  public async atualizar(id: string, jogo: UpdateJogoDto) {
    return await prisma.jogo.update({
      where: {
        id,
      },
      data: jogo,
    });
  }

  public async deletar(id: string) {
    return await prisma.jogo.delete({
      where: {
        id,
      },
    });
  }
}

export default JogoRepository;
