import { Response, Request } from "express";
import { IUsers } from "../types/usersType";
import { UploadedFile } from "express-fileupload";
import { Users } from "../models/usersModel";
import mongoose from "mongoose";
// import mongodb from "mongodb";

const getPersonalService = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;
    const email = query.email;
    const personal: IUsers[] = await Users.find({ email: email });
    res.status(200).json({ personal });
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const allUsers: IUsers[] = await Users.find({});
    res.status(200).json({ allUsers });
  } catch (error) {
    throw error;
  }
};

const addOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUsers, keyof IUsers>;
    const file = req.files?.file as UploadedFile;

    const newImg = file?.data;
    const encImg = newImg.toString("base64");

    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, "base64"),
    };

    const user: IUsers = new Users({
      name: body.name,
      email: body.email,
      serviceName: body.serviceName,
      projectDetails: body.projectDetails,
      price: body.price,
      status: body.status,
      image: image,
    });

    const newUser: IUsers = await user.save();
    const allUsers: IUsers[] = await Users.find();

    res.status(201).json({ message: "New Order Added", user: newUser, users: allUsers });
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const param = req.params;
    const _id = param.id;

    const body = req.body as Pick<IUsers, keyof IUsers>;
    const updatedUser = await Users.findByIdAndUpdate<IUsers | null>({ _id: _id }, { status: body.status });

    const allUsers: IUsers[] = await Users.find({});
    res.status(200).json({
      allUsers,
    });
  } catch (error) {
    throw error;
  }
};

export { getPersonalService, getAllUsers, addOrder, updateStatus };
