import { Schema, Types, model } from "mongoose";

export interface IPolygon {
  sessionId: Types.ObjectId;
  coordinates: number[][][];
  label: string;
}

const PolygonSchema = new Schema<IPolygon>({
  sessionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Session",
  },
  label: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [[[Number]]],
    required: true,
  },
});

export default model<IPolygon>("Polygon", PolygonSchema);
