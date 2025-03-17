import { NextFunction, Request, Response } from "express";
import { validateUuid } from "../utils/validateUuid.utils";

export async function validateIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  if (!validateUuid(id)) {
    res.status(400).json({
      message: "O campo id está em um formato inválido, deve ser um uuidV4",
    });
    return;
  }

  next();
}
