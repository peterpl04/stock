import { Router } from "express";
import { stockMovementController } from "../controllers/stock-movement.controller";

export const stockMovementRoutes = Router();

stockMovementRoutes.get("/", stockMovementController.list);
stockMovementRoutes.post("/", stockMovementController.create);
