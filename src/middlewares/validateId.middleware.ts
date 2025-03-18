import { NextFunction, Request, Response } from "express";
import validateUuid from "../utils/validateUuid.utils";

const validateIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { id } = req.params;

    if (!validateUuid(id)) {
      res.status(400).json({
        message: "O campo id está em um formato inválido, deve ser um uuidV4",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default validateIdMiddleware;
