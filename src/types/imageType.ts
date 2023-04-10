import { Document } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;
export interface IImages extends Document {
  // _id: typeof ObjectId;
  contentType: string;
  size: number;
  img: Buffer;
}
