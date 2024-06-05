import { Schema, model } from "mongoose";

const CounterSchema = new Schema<{ name: string; seq: number }>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    seq: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Counter = model<{ name: string; seq: number }>(
  "Counter",
  CounterSchema
);
