import { Polygon } from "geojson";
import Paths from "../lib/Paths";

export interface IFeature extends GeoJSON.Feature<Polygon> {
  sessionId: string;
  _id: string;
}

const create = async ({
  feature,
  session,
}: {
  feature: GeoJSON.Feature;
  session: string;
}): Promise<IFeature> => {
  return await fetch(Paths.Api.Features.Create(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...feature,
      session,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => data.feature);
};

const remove = async (id: string): Promise<void> => {
  return await fetch(Paths.Api.Features.Remove(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    console.log("res", res);
    return res.json();
  });
};

export default {
  create,
  remove,
};
