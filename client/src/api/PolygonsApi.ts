import { Polygon } from "geojson";

export interface IPolygon extends GeoJSON.Feature<Polygon> {
  sessionId: string;
  _id: string;
}
