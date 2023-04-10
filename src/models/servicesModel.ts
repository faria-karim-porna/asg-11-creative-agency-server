import { IImages } from "../types/imageType";
import { IServices } from "../types/servicesType";
import { model, Schema } from "mongoose";

// const ObjectId = require("mongodb").ObjectId;

const servicesSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  serviceTitle: { type: String, required: true },
  serviceDescription: { type: String, required: true },
  image: { type: <IImages>{}, required: true },
});

export const Services = model<IServices>("Services", servicesSchema);
