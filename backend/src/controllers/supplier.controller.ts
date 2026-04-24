import { Request, Response } from "express";
import { z } from "zod";
import { supplierService } from "../services/supplier.service";
import { parsePagination } from "../utils/pagination";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(8).optional()
});

export const supplierController = {
  async create(req: Request, res: Response) {
    const data = schema.parse(req.body);
    const result = await supplierService.create(data);
    return res.status(201).json(result);
  },
  async update(req: Request, res: Response) {
    const data = schema.parse(req.body);
    const id = String(req.params.id);
    const result = await supplierService.update(id, data);
    return res.status(200).json(result);
  },
  async remove(req: Request, res: Response) {
    const id = String(req.params.id);
    await supplierService.remove(id);
    return res.status(204).send();
  },
  async list(req: Request, res: Response) {
    const { page, limit, skip } = parsePagination(req.query);
    const search = String(req.query.search || "");
    const result = await supplierService.list(skip, limit, search);
    return res.status(200).json({ page, limit, ...result });
  }
};
