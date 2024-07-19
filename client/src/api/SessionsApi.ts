import Paths from "../lib/Paths";
import { IPolygon } from "./PolygonsApi";

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

export type ListSessionPolygonsResponse = {
  polygons: IPolygon[];
  session: ISession;
};

const listSessionPosts = (
  id: string | undefined
): Promise<ListSessionPolygonsResponse | undefined> => {
  if (!id) {
    return Promise.resolve(undefined);
  }

  return fetch(Paths.Api.Sessions.ListSessionPolygons(id))
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};

export default {
  create,
  listSessionPosts,
};
