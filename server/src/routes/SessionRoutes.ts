import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "./types/express/misc";
import { ISession } from "@src/models/Session";
import SessionsController from "@src/controllers/SessionsController";

export const createSession = async (
  req: IReq<Omit<ISession, "createdAt">>,
  res: IRes
) => {
  const { lat, long } = req.body;
  const session = await SessionsController.create({ lat, long });
  return res.status(HttpStatusCodes.CREATED).json({ session });
};
