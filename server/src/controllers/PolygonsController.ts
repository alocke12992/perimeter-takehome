import { Types } from "mongoose";
import Polygon, { IPolygon } from "@src/models/Polygon";

const create = async (polygon: IPolygon): Promise<void> => {
  const newPolygon = new Polygon(polygon);
  await newPolygon.save();
  return;
};

const list = async (): Promise<IPolygon[]> => {
  return await Polygon.find();
};

const update = async (id: Types.ObjectId, polygon: IPolygon): Promise<void> => {
  await Polygon.findByIdAndUpdate(id, polygon);
  return;
};

const remove = async (id: Types.ObjectId): Promise<void> => {
  await Polygon.findByIdAndDelete(id);
  return;
};

const listBySessionId = async (
  sessionId: Types.ObjectId
): Promise<IPolygon[]> => {
  return await Polygon.find({ sessionId });
};

export default {
  create,
  list,
  update,
  remove,
  listBySessionId,
};
