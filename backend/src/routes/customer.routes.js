import express from "express";
import {register, login} from "../controllers/auth.controllers.js"
const customerRoute = express.Router()

customerRoute.post("/create-customer", register);
customerRoute.post("/login", login);


export default customerRoute