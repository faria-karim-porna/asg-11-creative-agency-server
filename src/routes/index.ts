import { Router } from "express";
import { addAdmin, isAdmin } from "../controllers/adminsController";
import { addReview, getReviews } from "../controllers/reviewsController";
import { addService, getOneService, getServiceInfo, getServices } from "../controllers/servicesController";
import { addOrder, getAllUsers, getPersonalService, updateStatus } from "../controllers/usersController";

const router: Router = Router();

router.post("/addAdmin", addAdmin);

router.post("/isAdmin", isAdmin);

router.post("/addReview", addReview);

router.get("/reviews", getReviews);

router.post("/addService", addService);

router.get("/services", getServices);

router.get("/oneService", getOneService);

router.get("/serviceInfo", getServiceInfo);

router.post("/addOrder", addOrder);

router.get("/personalService", getPersonalService);

router.get("/allUsers", getAllUsers);

router.patch("/updateStatus/:id", updateStatus);


export default router;
