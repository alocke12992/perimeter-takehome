import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "./types/express/misc";
import { ObjectId } from "mongodb";
import { IFeature } from "@src/models/Feature";
import FeaturesController from "@src/controllers/FeaturesController";

const create = async (req: IReq<IFeature>, res: IRes) => {
  const { sessionId, geometry, properties } = req.body;
  await FeaturesController.create({
    properties,
    sessionId,
    geometry,
    type: "Feature",
  });
  return res.status(HttpStatusCodes.CREATED).end();
};

const list = async (req: IReq, res: IRes) => {
  const features = await FeaturesController.list();
  return res.status(HttpStatusCodes.OK).json({ features });
};

const update = async (req: IReq<IFeature>, res: IRes) => {
  const { sessionId, geometry, properties } = req.body;

  await FeaturesController.update(new ObjectId(req.params.id), {
    properties,
    sessionId,
    geometry,
    type: "Feature",
  });
  return res.status(HttpStatusCodes.CREATED).end();
};

const remove = async (req: IReq, res: IRes) => {
  await FeaturesController.remove(new ObjectId(req.params.id));
  return res.status(HttpStatusCodes.NO_CONTENT).end();
};

export default {
  create,
  list,
  update,
  remove,
};
