import { ObjectId } from "mongodb";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "./types/express/misc";
import { ISession } from "@src/models/Session";
import SessionsController from "@src/controllers/SessionsController";
import FeaturesController from "@src/controllers/FeaturesController";

const create = async (
  req: IReq<Omit<ISession, "createdAt" | "features">>,
  res: IRes
) => {
  const { lat, long } = req.body;
  const session = await SessionsController.create({ lat, long });
  return res.status(HttpStatusCodes.CREATED).json({ session });
};

const get = async (req: IReq, res: IRes) => {
  const session = await SessionsController.get(new ObjectId(req.params.id));
  return res.status(HttpStatusCodes.OK).json({ session });
};

export default {
  create,
  get,
};
