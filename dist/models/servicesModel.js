"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const mongoose_1 = require("mongoose");
// const ObjectId = require("mongodb").ObjectId;
const servicesSchema = new mongoose_1.Schema({
    // _id: { type: typeof ObjectId, required: true },
    serviceTitle: { type: String, required: true },
    serviceDescription: { type: String, required: true },
    image: { type: {}, required: true },
});
exports.Services = (0, mongoose_1.model)("Services", servicesSchema);
