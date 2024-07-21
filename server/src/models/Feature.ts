import GeoJSON, { Polygon } from "geojson";
import { Schema, Types, model } from "mongoose";

const FeatureSchema = new Schema<GeoJSON.Feature<Polygon>>({
  type: {
    type: String,
    enum: ["Feature"],
    required: true,
    default: "Feature",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Polygon"],
      required: true,
      default: "Polygon",
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
    },
  },
  properties: {
    type: {
      name: {
        type: String,
        required: true,
      },
    },
  },
});

export default model<GeoJSON.Feature<Polygon>>("Feature", FeatureSchema);
