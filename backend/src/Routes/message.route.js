import express from "express";
import { protectRoute } from "../Midleware/auth.middleware.js";
import { getMassages, getUsersForSidebar , sendMessages } from "../controllers/message.control.js";
const Router = express.Router();

Router.get("/users" , protectRoute , getUsersForSidebar);
Router.get("/:id" , protectRoute , getMassages);

Router.post("/send/:id", protectRoute , sendMessages)

export default Router;