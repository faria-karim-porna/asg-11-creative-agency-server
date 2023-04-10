import { Response, Request } from "express";
import { IAdmins } from "../types/adminsType";
import { Admins } from "../models/adminsModel";

const isAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IAdmins, keyof IAdmins>;
    const email = body.email;
    const admins: IAdmins[] = await Admins.find({ email: email });
    res.status(200).json(admins.length > 0);
  } catch (error) {
    throw error;
  }
};

const addAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IAdmins, keyof IAdmins>;

    const admin: IAdmins = new Admins({
      email: body.email,
    });

    const newAdmin: IAdmins = await admin.save();
    const allAdmins: IAdmins[] = await Admins.find();

    res.status(201).json({ message: "New admin added", admin: newAdmin, admins: allAdmins });
  } catch (error) {
    throw error;
  }
};

export { addAdmin, isAdmin };
