import { Feature } from "geojson";
import Paths from "../lib/Paths";

export interface IFeature extends GeoJSON.Feature<Feature> {
  sessionId: string;
  _id: string;
}

const create = (feature: GeoJSON.Feature): Promise<void> => {
  return fetch(Paths.Api.Features.Create(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(feature),
  }).then((res) => res.json());
};

export default {
  create,
};
