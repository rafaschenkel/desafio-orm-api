import { NextFunction, Request, Response } from "express";

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
        error: "Corpo da requisição não é um JSON válido.",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default jsonMiddleware;
