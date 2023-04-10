"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admins = void 0;
const mongoose_1 = require("mongoose");
// const ObjectId = require("mongodb").ObjectId;
const adminsSchema = new mongoose_1.Schema({
    // _id: { type: typeof ObjectId, required: true },
    email: { type: String, required: true },
});
exports.Admins = (0, mongoose_1.model)("Admins", adminsSchema);
