import express from 'express';
import { signup , login , logout, updateProfile, checkAuth } from '../controllers/auth.control.js';
import {protectRoute} from "../Midleware/auth.middleware.js";

const Routes = express.Router();

Routes.post("/signup" , signup);
Routes.post("/login" , login);
Routes.post("/logout" , logout);

Routes.put("/update-profile" , protectRoute , updateProfile);
Routes.get("/check" , protectRoute , checkAuth)

export default Routes;