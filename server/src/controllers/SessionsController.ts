import Session, { ISession } from "@src/models/Session";
import { Types } from "mongoose";

export const create = async (
  session: Omit<ISession, "createdAt" | "features">
): Promise<ISession> => {
  const newSession = new Session(session);
  return await newSession.save();
};

const get = async (id: Types.ObjectId): Promise<ISession | null> => {
  return await Session.findById(id).populate("features").exec();
};

export default {
  create,
  get,
};
