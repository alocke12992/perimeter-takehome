import { Types } from "mongoose";
import Feature, { IFeature } from "@src/models/Feature";
import Session from "@src/models/Session";
import { ObjectId } from "mongodb";

const create = async (feature: IFeature): Promise<IFeature> => {
  console.log("feature", feature);
  const sessionId = new ObjectId(feature.session);
  const session = await Session.findById(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }

  const newFeature = new Feature({
    ...feature,
    session: sessionId,
  });
  await newFeature.save();

  session.features.push(newFeature._id);
  await session.save();

  return newFeature;
};

const list = async (): Promise<IFeature[]> => {
  return await Feature.find();
};

const update = async (
  id: Types.ObjectId,
  feature: IFeature
): Promise<IFeature> => {
  const update = await Feature.findByIdAndUpdate(id, feature, { new: true });
  console.log("update", update);
  if (!update) {
    throw new Error("Feature not found");
  }
  return update;
};

const remove = async (id: Types.ObjectId): Promise<void> => {
  await Feature.findByIdAndDelete(id).then(async (feature) => {
    await Session.findByIdAndUpdate(feature?.session, {
      $pull: { features: feature?._id },
    });
  });
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
