import Paths from "../lib/Paths";
import { IFeature } from "./FeaturesApi";

export interface ISession {
  lat: number;
  long: number;
  createdAt: Date;
  features: IFeature[];
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

const get = (id: string | undefined): Promise<ISession | undefined> => {
  if (!id) {
    return Promise.resolve(undefined);
  }

  return fetch(Paths.Api.Sessions.Get(id))
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};

export default {
  create,
  get,
};
