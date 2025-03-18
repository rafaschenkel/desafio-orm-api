import { handlerError } from "../config/error.handler";
import { prisma } from "../config/prisma.config";
import CreatePersonagemDto from "../dtos/create-personagem.dto";
import UpdatePersonagemDto from "../dtos/update-personagem.dto";

class PersonagemRepository {
  public async listar(includeJogo?: boolean) {
    try {
      const personagens = await prisma.personagem.findMany({
        include: { jogo: includeJogo },
        orderBy: {
          nome: "asc",
        },
      });
      return personagens;
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async obterPorId(id: string, includeJogo?: boolean) {
    try {
      const personagem = await prisma.personagem.findUnique({
        where: {
          id,
        },
        include: {
          jogo: includeJogo,
        },
      });
      return personagem;
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async criar(personagem: CreatePersonagemDto) {
    try {
      await prisma.personagem.create({
        data: personagem,
      });
      return "Personagem criado com sucesso";
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async atualizar(id: string, personagem: UpdatePersonagemDto) {
    try {
      await prisma.personagem.update({
        where: {
          id,
        },
        data: personagem,
      });
      return "Personagem atualizado com sucesso";
    } catch (error: any) {
      handlerError(error);
    }
  }

  public async deletar(id: string) {
    try {
      await prisma.personagem.delete({
        where: {
          id,
        },
      });
      return "Personagem deletado com sucesso";
    } catch (error: any) {
      handlerError(error);
    }
  }
}

export default PersonagemRepository;
