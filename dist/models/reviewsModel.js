"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reviews = void 0;
const mongoose_1 = require("mongoose");
// const ObjectId = require("mongodb").ObjectId;
const reviewsSchema = new mongoose_1.Schema({
    // _id: { type: typeof ObjectId, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    designation: { type: String, required: true },
    description: { type: String, required: true },
});
exports.Reviews = (0, mongoose_1.model)("Reviews", reviewsSchema);
