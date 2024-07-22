import HttpStatusCodes from "../common/HttpStatusCodes";
import { IReq, IRes } from "./types/express/misc";
import { ObjectId } from "mongodb";
import { IFeature } from "../models/Feature";
import FeaturesController from "../controllers/FeaturesController";
import { validationResult } from "express-validator";

const create = async (req: IReq<IFeature>, res: IRes) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const feature = await FeaturesController.create(req.body);
  return res.status(HttpStatusCodes.CREATED).json({ feature });
};

const list = async (req: IReq, res: IRes) => {
  const features = await FeaturesController.list();
  return res.status(HttpStatusCodes.OK).json({ features });
};

const update = async (req: IReq<IFeature>, res: IRes) => {
  const errors = validationResult(req);
  console.log("errors", errors);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }

  const feature = await FeaturesController.update(
    new ObjectId(req.params.id),
    req.body
  );
  return res.status(HttpStatusCodes.OK).json({ feature });
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
