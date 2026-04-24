import { Router } from "express";
import { supplierController } from "../controllers/supplier.controller";

export const supplierRoutes = Router();

supplierRoutes.get("/", supplierController.list);
supplierRoutes.post("/", supplierController.create);
supplierRoutes.put("/:id", supplierController.update);
supplierRoutes.delete("/:id", supplierController.remove);
