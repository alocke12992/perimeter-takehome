import { ObjectId } from "mongodb";
import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "./types/express/misc";
import { ISession } from "@src/models/Session";
import SessionsController from "@src/controllers/SessionsController";
import FeaturesController from "@src/controllers/FeaturesController";

const create = async (req: IReq<Omit<ISession, "createdAt">>, res: IRes) => {
  const { lat, long } = req.body;
  const session = await SessionsController.create({ lat, long });
  return res.status(HttpStatusCodes.CREATED).json({ session });
};

const listSessionFeatures = async (req: IReq, res: IRes) => {
  const { id } = req.params;
  const features = await FeaturesController.listBySessionId(new ObjectId(id));
  const session = await SessionsController.get(new ObjectId(id));
  return res.status(HttpStatusCodes.OK).json({ features, session });
};

export default {
  create,
  listSessionFeatures,
};
