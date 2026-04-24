import { Router } from "express";
import { productController } from "../controllers/product.controller";

export const productRoutes = Router();

productRoutes.get("/", productController.list);
productRoutes.get("/:id", productController.getById);
productRoutes.post("/", productController.create);
productRoutes.put("/:id", productController.update);
productRoutes.delete("/:id", productController.remove);
