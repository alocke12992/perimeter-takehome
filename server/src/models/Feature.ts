import GeoJSON, { Polygon } from "geojson";
import { Schema, Types, model } from "mongoose";

export interface IFeature extends GeoJSON.Feature<Polygon> {
  sessionId: Types.ObjectId;
}

const FeatureSchema = new Schema<IFeature>({
  sessionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Session",
  },
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

export default model<IFeature>("Feature", FeatureSchema);
