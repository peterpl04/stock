import { Request, Response } from "express";
import { z } from "zod";
import { categoryService } from "../services/category.service";
import { parsePagination } from "../utils/pagination";

const schema = z.object({
  name: z.string().min(2)
});

export const categoryController = {
  async create(req: Request, res: Response) {
    const { name } = schema.parse(req.body);
    const result = await categoryService.create(name);
    return res.status(201).json(result);
  },
  async update(req: Request, res: Response) {
    const { name } = schema.parse(req.body);
    const id = String(req.params.id);
    const result = await categoryService.update(id, name);
    return res.status(200).json(result);
  },
  async remove(req: Request, res: Response) {
    const id = String(req.params.id);
    await categoryService.remove(id);
    return res.status(204).send();
  },
  async list(req: Request, res: Response) {
    const { page, limit, skip } = parsePagination(req.query);
    const search = String(req.query.search || "");
    const result = await categoryService.list(skip, limit, search);
    return res.status(200).json({ page, limit, ...result });
  }
};
