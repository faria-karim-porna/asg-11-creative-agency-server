import { Document } from "mongoose";
import { IImages } from "./imageType";
// const ObjectId = require("mongodb").ObjectId;
export interface IServices extends Document {
  // _id: typeof ObjectId;
  serviceTitle: string;
  serviceDescription: string;
  image: IImages;
}
