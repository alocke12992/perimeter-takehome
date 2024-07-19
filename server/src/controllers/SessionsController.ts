import Session, { ISession } from "@src/models/Session";
import { Types } from "mongoose";

export const create = async (
  session: Omit<ISession, "createdAt">
): Promise<ISession> => {
  const newSession = new Session(session);
  await newSession.save();
  return newSession;
};

const get = async (id: Types.ObjectId): Promise<ISession | null> => {
  return await Session.findById(id);
};

export default {
  create,
  get,
};
