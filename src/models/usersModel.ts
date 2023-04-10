import { IImages } from "../types/imageType";
import { IUsers } from "../types/usersType";
import { model, Schema } from "mongoose";

// const ObjectId = require("mongodb").ObjectId;

const usersSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  serviceName: { type: String, required: true },
  projectDetails: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: <IImages>{}, required: true },
});

export const Users = model<IUsers>("Users", usersSchema);
