import { Prisma } from "@prisma/client";
import { productRepository } from "../repositories/product.repository";

type ProductInput = {
  name: string;
  code: string;
  barcode?: string;
  categoryId: string;
  supplierId: string;
  quantity: number;
  minStock: number;
  costPrice: number;
  salePrice: number;
  imageUrl?: string;
};

function toCreatePayload(data: ProductInput): Prisma.ProductUncheckedCreateInput {
  return {
    name: data.name,
    code: data.code,
    barcode: data.barcode,
    categoryId: data.categoryId,
    supplierId: data.supplierId,
    quantity: data.quantity,
    minStock: data.minStock,
    costPrice: new Prisma.Decimal(data.costPrice),
    salePrice: new Prisma.Decimal(data.salePrice),
    imageUrl: data.imageUrl
  };
}

export const productService = {
  create(data: ProductInput) {
    return productRepository.create(toCreatePayload(data));
  },
  async update(id: string, data: ProductInput) {
    const existing = await productRepository.findById(id);
    if (!existing) {
      throw new Error("Produto nao encontrado");
    }

    return productRepository.update(id, toCreatePayload(data));
  },
  async remove(id: string) {
    const existing = await productRepository.findById(id);
    if (!existing) {
      throw new Error("Produto nao encontrado");
    }

    return productRepository.delete(id);
  },
  async list(skip: number, limit: number, filters: { search?: string; categoryId?: string; supplierId?: string }) {
    const [items, total] = await Promise.all([
      productRepository.findMany(skip, limit, filters),
      productRepository.count(filters)
    ]);
    return { items, total };
  },
  findById(id: string) {
    return productRepository.findById(id);
  }
};
