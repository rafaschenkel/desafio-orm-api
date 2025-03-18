import { NextFunction, Request, Response } from "express";
import validateUuid from "../utils/validateUuid.utils";
import handlerError from "../config/error.handler";

const validateIdPersonagemMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { idPersonagem } = req.params;

    if (!validateUuid(idPersonagem)) {
      res.status(400).json({
        ok: false,
        message:
          "O campo idPersonagem está em um formato inválido, deve ser um uuidV4",
      });
      return;
    }

    next();
  } catch (error) {
    handlerError(error, res);
  }
};

export default validateIdPersonagemMiddleware;
