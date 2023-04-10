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
exports.addService = exports.getServiceInfo = exports.getOneService = exports.getServices = void 0;
const servicesModel_1 = require("../models/servicesModel");
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allServices = yield servicesModel_1.Services.find({});
        res.status(200).json({ allServices });
    }
    catch (error) {
        throw error;
    }
});
exports.getServices = getServices;
const getOneService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const title = query.serviceTitle;
        const service = yield servicesModel_1.Services.find({ serviceTitle: title });
        res.status(200).json({ service });
    }
    catch (error) {
        throw error;
    }
});
exports.getOneService = getOneService;
const getServiceInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const title = query.serviceTitle;
        const service = yield servicesModel_1.Services.find({ serviceTitle: title });
        res.status(200).json({ service });
    }
    catch (error) {
        throw error;
    }
});
exports.getServiceInfo = getServiceInfo;
const addService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const service = new servicesModel_1.Services({
            serviceTitle: body.serviceTitle,
            serviceDescription: body.serviceDescription,
            image: image,
        });
        const newService = yield service.save();
        const allServices = yield servicesModel_1.Services.find();
        res.status(201).json({ message: "New service added", service: newService, services: allServices });
    }
    catch (error) {
        throw error;
    }
});
exports.addService = addService;
