import { Feature } from "geojson";
import Paths from "../lib/Paths";

export interface IFeature extends GeoJSON.Feature<Feature> {
  sessionId: string;
  _id: string;
}

const create = async (
  feature: GeoJSON.Feature,
  sessionId: string
): Promise<void> => {
  return await fetch(Paths.Api.Features.Create(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...feature, sessionId }),
  }).then((res) => {
    console.log("res", res);
    return res.json();
  });
};

export default {
  create,
};
