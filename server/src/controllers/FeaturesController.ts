import { Types } from "mongoose";
import Feature, { IFeature } from "@src/models/Feature";

const create = async (feature: IFeature): Promise<void> => {
  const newFeature = new Feature(feature);
  await newFeature.save();
};

const list = async (): Promise<IFeature[]> => {
  return await Feature.find();
};

const update = async (id: Types.ObjectId, feature: IFeature): Promise<void> => {
  await Feature.findByIdAndUpdate(id, feature);
  return;
};

const remove = async (id: Types.ObjectId): Promise<void> => {
  await Feature.findByIdAndDelete(id);
  return;
};

const listBySessionId = async (
  sessionId: Types.ObjectId
): Promise<IFeature[]> => {
  return await Feature.find({ sessionId });
};

export default {
  create,
  list,
  update,
  remove,
  listBySessionId,
};
