import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { categoryRoutes } from "./categories.routes";
import { dashboardRoutes } from "./dashboard.routes";
import { productRoutes } from "./products.routes";
import { stockMovementRoutes } from "./stock-movements.routes";
import { supplierRoutes } from "./suppliers.routes";

export const publicRoutes = Router();
export const protectedRoutes = Router();

publicRoutes.use("/auth", authRoutes);

protectedRoutes.use("/products", productRoutes);
protectedRoutes.use("/categories", categoryRoutes);
protectedRoutes.use("/suppliers", supplierRoutes);
protectedRoutes.use("/stock-movements", stockMovementRoutes);
protectedRoutes.use("/dashboard", dashboardRoutes);
