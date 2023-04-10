import { Document } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;
export interface IReviews extends Document {
  // _id: typeof ObjectId;
  name: string;
  image: string;
  designation: string;
  description: string;
}
