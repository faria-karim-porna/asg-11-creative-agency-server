import { IReviews } from "../types/reviewsType";
import { model, Schema } from "mongoose";

// const ObjectId = require("mongodb").ObjectId;

const reviewsSchema: Schema = new Schema({
  // _id: { type: typeof ObjectId, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  designation: { type: String, required: true },
  description: { type: String, required: true },
});

export const Reviews = model<IReviews>("Reviews", reviewsSchema);
