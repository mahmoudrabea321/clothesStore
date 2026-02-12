import express from "express";
import { login , logout , signup , getMe} from "../controllers/auth.control.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const route = express.Router();

route.post('/signup',signup);
route.post('/login',login);
route.post('/logout',logout);
route.get("/me",  getMe);


export default route