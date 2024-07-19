import Session, { ISession } from "@src/models/Session";

export const create = async (session: Omit<ISession, "createdAt">): Promise<ISession> => {
  const newSession = new Session(session);
  await newSession.save();
  return newSession;
}

export default {
  create,
}