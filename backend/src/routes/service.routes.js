import express from "express";
import {createService, 
    getServices, 
    getService, 
    updateService, 
    deleteService} from "../controllers/service.controllers.js";
import protect from "../middleware/auth.middleware.js";
const serviceRoute = express.Router()

serviceRoute.post("/create-service", protect, createService);
serviceRoute.get("/get-services", protect, getServices);
serviceRoute.get("/get-service/:id", protect, getService);
serviceRoute.get("/update-service/:id", protect, updateService);
serviceRoute.get("/delete-service/:id", protect, deleteService);


export default serviceRoute