import { Schema, Types, model } from "mongoose";

export interface ISession {
  lat: number;
  long: number;
  createdAt: Date;
  features: Types.ObjectId[];
}

const SessionSchema = new Schema<ISession>({
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  features: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feature",
      default: [],
    },
  ],
});

export default model<ISession>("Session", SessionSchema);
