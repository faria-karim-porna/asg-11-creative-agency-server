import { Response, Request } from "express";
import { IServices } from "../types/servicesType";
import { Services } from "../models/servicesModel";
import { UploadedFile } from "express-fileupload";

const getServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const allServices: IServices[] = await Services.find({});
    res.status(200).json({ allServices });
  } catch (error) {
    throw error;
  }
};

const getOneService = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;
    const title = query.serviceTitle;
    const service: IServices[] = await Services.find({ serviceTitle: title });
    res.status(200).json({ service });
  } catch (error) {
    throw error;
  }
};

const getServiceInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query;
    const title = query.serviceTitle;
    const service: IServices[] = await Services.find({ serviceTitle: title });
    res.status(200).json({ service });
  } catch (error) {
    throw error;
  }
};

const addService = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IServices, keyof IServices>;
    const file = req.files?.file as UploadedFile;

    const newImg = file?.data;
    const encImg = newImg.toString("base64");

    const image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, "base64"),
    };

    const service: IServices = new Services({
      serviceTitle: body.serviceTitle,
      serviceDescription: body.serviceDescription,
      image: image,
    });

    const newService: IServices = await service.save();
    const allServices: IServices[] = await Services.find();

    res.status(201).json({ message: "New service added", service: newService, services: allServices });
  } catch (error) {
    throw error;
  }
};

export { getServices, getOneService, getServiceInfo, addService };
