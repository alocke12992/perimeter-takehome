import { Schema, model } from "mongoose";

export interface ISession {
  lat: number;
  long: number;
  createdAt: Date;
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
});

export default model<ISession>("Session", SessionSchema);
