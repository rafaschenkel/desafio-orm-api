import { NextFunction, Request, Response } from "express";
import validateUuid from "../utils/validateUuid.utils";
import handlerError from "../config/error.handler";

const validateIdJogoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { idJogo } = req.params;

    if (!validateUuid(idJogo)) {
      res.status(400).json({
        ok: false,
        message:
          "O campo idJogo está em um formato inválido, deve ser um uuidV4",
      });
      return;
    }

    next();
  } catch (error) {
    handlerError(error, res);
  }
};

export default validateIdJogoMiddleware;
