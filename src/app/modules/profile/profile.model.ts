import { Schema, model } from "mongoose";
import { IProfile } from "./profile.interface";

const profileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    user_name: {
      type: String,
      unique: true,
    },
    birthday: {
      type: Date,
    },
    user_name_updated: {
      type: Date,
    },
  },
  { timestamps: true }
);

profileSchema.pre("save", function (next) {
  if (this.isModified("user_name")) {
    this.user_name_updated = new Date();
  }
  next();
});

export const profile = model<IProfile>("profile", profileSchema);
