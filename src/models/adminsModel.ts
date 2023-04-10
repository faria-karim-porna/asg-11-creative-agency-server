import { IAdmins } from "../types/adminsType";
import { model, Schema } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;

const adminsSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  email: { type: String, required: true },
});

export const Admins = model<IAdmins>("Admins", adminsSchema);
