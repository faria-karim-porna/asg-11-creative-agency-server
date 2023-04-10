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
exports.addReview = exports.getReviews = void 0;
const reviewsModel_1 = require("../models/reviewsModel");
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allReviews = yield reviewsModel_1.Reviews.find({}).limit(5);
        res.status(200).json({ allReviews });
    }
    catch (error) {
        throw error;
    }
});
exports.getReviews = getReviews;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const review = new reviewsModel_1.Reviews({
            name: body.name,
            image: body.image,
            designation: body.designation,
            description: body.description,
        });
        const newReview = yield review.save();
        const allReviews = yield reviewsModel_1.Reviews.find();
        res.status(201).json({ message: "New review added", review: newReview, reviews: allReviews });
    }
    catch (error) {
        throw error;
    }
});
exports.addReview = addReview;
