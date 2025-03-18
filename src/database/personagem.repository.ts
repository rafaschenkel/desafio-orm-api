import { prisma } from "../config/prisma.config";
import CreatePersonagemDto from "../dtos/create-personagem.dto";
import UpdatePersonagemDto from "../dtos/update-personagem.dto";

class PersonagemRepository {
  public async listar(idJogo: string) {
    return await prisma.personagem.findMany({
      where: {
        idJogo: idJogo,
      },
    });
  }

  public async obterPorId(idJogo: string, idPersonagem: string) {
    return await prisma.personagem.findUnique({
      where: {
        id: idPersonagem,
        idJogo,
      },
    });
  }

  public async criar(idJogo: string, personagem: CreatePersonagemDto) {
    return await prisma.personagem.create({
      data: {
        idJogo,
        ...personagem,
      },
    });
  }

  public async atualizar(
    idJogo: string,
    idPersonagem: string,
    personagem: UpdatePersonagemDto
  ) {
    return await prisma.personagem.update({
      where: {
        id: idPersonagem,
        idJogo,
      },
      data: personagem,
    });
  }

  public async deletar(idJogo: string, idPersonagem: string) {
    return await prisma.personagem.delete({
      where: {
        id: idPersonagem,
        idJogo,
      },
    });
  }
}

export default PersonagemRepository;
