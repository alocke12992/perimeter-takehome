import Paths from "../lib/Paths";
import { IFeature } from "./FeaturesApi";

export interface ISession {
  lat: number;
  long: number;
  createdAt: Date;
  _id: string;
}

export type CreateSessionBody = {
  lat: number;
  long: number;
};

const create = ({ lat, long }: CreateSessionBody): Promise<ISession> => {
  return fetch(Paths.Api.Sessions.Create(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lat, long }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res.session;
    });
};

export type ListSessionFeaturesResponse = {
  features: IFeature[];
  session: ISession;
};

const listSessionFeatures = (
  id: string | undefined
): Promise<ListSessionFeaturesResponse | undefined> => {
  if (!id) {
    return Promise.resolve(undefined);
  }

  return fetch(Paths.Api.Sessions.ListSessionFeatures(id))
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};

export default {
  create,
  listSessionFeatures,
};
