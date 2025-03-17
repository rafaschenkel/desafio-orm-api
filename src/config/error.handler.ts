import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

/**
 * Função para lidar com erros. Se o erro for do tipo
 * PrismaClientKnownRequestError, apenas lança o erro.
 * Caso contrário, lança o erro com uma mensagem padrão se houver uma.
 * @param {any} error - O erro a ser tratado.
 */
export function handlerError(error: any) {
  if (error instanceof PrismaClientKnownRequestError) {
    console.log(error);
    throw error;
  }
  console.log(error);
  const message = error.message ?? error;
  throw message;
}
