import { Response } from "express";

const handlerError = (error: any, res: Response) => {
  res.status(500).json({ ok: false, message: error.toString() });
};

export default handlerError;
