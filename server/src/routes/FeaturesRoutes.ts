import HttpStatusCodes from "@src/common/HttpStatusCodes";
import { IReq, IRes } from "./types/express/misc";
import { ObjectId } from "mongodb";
import FeaturesController from "@src/controllers/FeaturesController";
import { Polygon } from "geojson";

const create = async (req: IReq<GeoJSON.Feature<Polygon>>, res: IRes) => {
  await FeaturesController.create(req.body);
  return res
    .status(HttpStatusCodes.CREATED)
    .json({ message: "Feature created" });
};

const list = async (req: IReq, res: IRes) => {
  const features = await FeaturesController.list();
  return res.status(HttpStatusCodes.OK).json({ features });
};

const update = async (req: IReq<GeoJSON.Feature<Polygon>>, res: IRes) => {
  await FeaturesController.update(new ObjectId(req.params.id), req.body);
  return res.status(HttpStatusCodes.CREATED).send();
};

const remove = async (req: IReq, res: IRes) => {
  await FeaturesController.remove(new ObjectId(req.params.id));
  return res.status(HttpStatusCodes.OK).json({ message: "Deleted" });
};

export default {
  create,
  list,
  update,
  remove,
};
