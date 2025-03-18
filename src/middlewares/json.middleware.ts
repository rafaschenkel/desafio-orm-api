import { NextFunction, Request, Response } from "express";
import handlerError from "../config/error.handler";

const jsonMiddleware = async (
  err: SyntaxError,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.is("application/json") || err instanceof SyntaxError) {
      // Erro de JSON malformado
      res.status(415).json({
        ok: false,
        message: "Corpo da requisição não é um JSON válido.",
      });
      return;
    }

    next();
  } catch (error) {
    handlerError(error, res);
  }
};

export default jsonMiddleware;
