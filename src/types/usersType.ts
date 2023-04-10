import { Document } from "mongoose";
import { IImages } from "./imageType";
// const ObjectId = require("mongodb").ObjectId;
export interface IUsers extends Document {
  // _id: typeof ObjectId;
  name: string;
  email: string;
  serviceName: string;
  projectDetails: string;
  price: string;
  status: string;
  image: IImages;
}
