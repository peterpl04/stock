import { MovementType } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import { stockMovementService } from "../services/stock-movement.service";
import { parsePagination } from "../utils/pagination";

const createSchema = z.object({
  type: z.enum(["ENTRY", "EXIT"]),
  quantity: z.number().int().positive(),
  productId: z.string().min(1)
});

export const stockMovementController = {
  async create(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Nao autorizado" });
    }

    const data = createSchema.parse(req.body);
    const result = await stockMovementService.create({
      ...data,
      userId
    });

    return res.status(201).json(result);
  },
  async list(req: Request, res: Response) {
    const { page, limit, skip } = parsePagination(req.query);
    const from = req.query.from ? new Date(String(req.query.from)) : undefined;
    const to = req.query.to ? new Date(String(req.query.to)) : undefined;
    const type = req.query.type ? (String(req.query.type).toUpperCase() as MovementType) : undefined;
    const productId = req.query.productId ? String(req.query.productId) : undefined;

    const result = await stockMovementService.list(skip, limit, {
      from,
      to,
      type,
      productId
    });

    return res.status(200).json({ page, limit, ...result });
  }
};
