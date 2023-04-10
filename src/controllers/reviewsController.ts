import { Response, Request } from "express";
import { IReviews } from "../types/reviewsType";
import { Reviews } from "../models/reviewsModel";

const getReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const allReviews: IReviews[] = await Reviews.find({}).limit(5);
    res.status(200).json({ allReviews });
  } catch (error) {
    throw error;
  }
};

const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IReviews, keyof IReviews>;

    const review: IReviews = new Reviews({
      name: body.name,
      image: body.image,
      designation: body.designation,
      description: body.description,
    });

    const newReview: IReviews = await review.save();
    const allReviews: IReviews[] = await Reviews.find();

    res.status(201).json({ message: "New review added", review: newReview, reviews: allReviews });
  } catch (error) {
    throw error;
  }
};

export { getReviews, addReview };
