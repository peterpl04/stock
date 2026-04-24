import { Request, Response } from "express";
import { z } from "zod";
import { productService } from "../services/product.service";
import { parsePagination } from "../utils/pagination";

const productSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(1),
  barcode: z.string().optional(),
  categoryId: z.string().min(1),
  supplierId: z.string().min(1),
  quantity: z.number().int().min(0),
  minStock: z.number().int().min(0),
  costPrice: z.number().nonnegative(),
  salePrice: z.number().nonnegative(),
  imageUrl: z.string().url().optional()
});

export const productController = {
  async create(req: Request, res: Response) {
    const data = productSchema.parse(req.body);
    const result = await productService.create(data);
    return res.status(201).json(result);
  },
  async update(req: Request, res: Response) {
    const data = productSchema.parse(req.body);
    const id = String(req.params.id);
    const result = await productService.update(id, data);
    return res.status(200).json(result);
  },
  async remove(req: Request, res: Response) {
    const id = String(req.params.id);
    await productService.remove(id);
    return res.status(204).send();
  },
  async list(req: Request, res: Response) {
    const { page, limit, skip } = parsePagination(req.query);
    const filters = {
      search: req.query.search ? String(req.query.search) : undefined,
      categoryId: req.query.categoryId ? String(req.query.categoryId) : undefined,
      supplierId: req.query.supplierId ? String(req.query.supplierId) : undefined
    };
    const result = await productService.list(skip, limit, filters);
    return res.status(200).json({ page, limit, ...result });
  },
  async getById(req: Request, res: Response) {
    const id = String(req.params.id);
    const item = await productService.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Produto nao encontrado" });
    }
    return res.status(200).json(item);
  }
};
