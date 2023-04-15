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
exports.updateStatus = exports.addOrder = exports.getAllUsers = exports.getPersonalService = void 0;
const usersModel_1 = require("../models/usersModel");
// import mongodb from "mongodb";
const getPersonalService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const email = query.email;
        const personal = yield usersModel_1.Users.find({ email: email });
        res.status(200).json({ personal });
    }
    catch (error) {
        throw error;
    }
});
exports.getPersonalService = getPersonalService;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield usersModel_1.Users.find({});
        res.status(200).json({ allUsers });
    }
    catch (error) {
        throw error;
    }
});
exports.getAllUsers = getAllUsers;
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const body = req.body;
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        const newImg = file === null || file === void 0 ? void 0 : file.data;
        const encImg = newImg.toString("base64");
        const image = {
            contentType: file.mimetype,
            size: file.size,
            img: Buffer.from(encImg, "base64"),
        };
        const user = new usersModel_1.Users({
            name: body.name,
            email: body.email,
            serviceName: body.serviceName,
            projectDetails: body.projectDetails,
            price: body.price,
            status: body.status,
            image: image,
        });
        const newUser = yield user.save();
        const allUsers = yield usersModel_1.Users.find();
        res.status(201).json({ message: "New Order Added", user: newUser, users: allUsers });
    }
    catch (error) {
        throw error;
    }
});
exports.addOrder = addOrder;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const param = req.params;
        const _id = param.id;
        const body = req.body;
        const updatedUser = yield usersModel_1.Users.findByIdAndUpdate({ _id: _id }, { status: body.status });
        const allUsers = yield usersModel_1.Users.find({});
        res.status(200).json({
            allUsers,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateStatus = updateStatus;
