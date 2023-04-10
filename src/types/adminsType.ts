import { Document } from "mongoose";
// const ObjectId = require("mongodb").ObjectId;
export interface IAdmins extends Document {
  // _id: typeof ObjectId;
  email: string;
}
