"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.addAdmin = void 0;
const adminsModel_1 = require("../models/adminsModel");
const isAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const email = body.email;
        const admins = yield adminsModel_1.Admins.find({ email: email });
        res.status(200).json(admins.length > 0);
    }
    catch (error) {
        throw error;
    }
});
exports.isAdmin = isAdmin;
const addAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const admin = new adminsModel_1.Admins({
            email: body.email,
        });
        const newAdmin = yield admin.save();
        const allAdmins = yield adminsModel_1.Admins.find();
        res.status(201).json({ message: "New admin added", admin: newAdmin, admins: allAdmins });
    }
    catch (error) {
        throw error;
    }
});
exports.addAdmin = addAdmin;
