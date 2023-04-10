"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = require("mongoose");
// const ObjectId = require("mongodb").ObjectId;
const usersSchema = new mongoose_1.Schema({
    // _id: { type: typeof ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    serviceName: { type: String, required: true },
    projectDetails: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    image: { type: {}, required: true },
});
exports.Users = (0, mongoose_1.model)("Users", usersSchema);
