import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/client";

type ProductFilters = {
  search?: string;
  categoryId?: string;
  supplierId?: string;
};

function buildWhere(filters: ProductFilters): Prisma.ProductWhereInput {
  const { search, categoryId, supplierId } = filters;
  return {
    categoryId: categoryId || undefined,
    supplierId: supplierId || undefined,
    OR: search
      ? [
          { name: { contains: search, mode: "insensitive" } },
          { code: { contains: search, mode: "insensitive" } },
          { barcode: { contains: search, mode: "insensitive" } }
        ]
      : undefined
  };
}

export const productRepository = {
  create(data: Prisma.ProductUncheckedCreateInput) {
    return prisma.product.create({ data });
  },
  update(id: string, data: Prisma.ProductUncheckedUpdateInput) {
    return prisma.product.update({ where: { id }, data });
  },
  delete(id: string) {
    return prisma.product.delete({ where: { id } });
  },
  findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true, supplier: true }
    });
  },
  findMany(skip: number, take: number, filters: ProductFilters) {
    return prisma.product.findMany({
      where: buildWhere(filters),
      include: { category: true, supplier: true },
      orderBy: { createdAt: "desc" },
      skip,
      take
    });
  },
  count(filters: ProductFilters) {
    return prisma.product.count({ where: buildWhere(filters) });
  },
  lowStock() {
    return prisma.product.findMany({
      where: { quantity: { lte: prisma.product.fields.minStock } },
      select: { id: true, name: true, quantity: true, minStock: true }
    });
  },
  totalValue() {
    return prisma.product.findMany({ select: { quantity: true, costPrice: true } });
  }
};
