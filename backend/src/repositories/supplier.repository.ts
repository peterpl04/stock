import { prisma } from "../prisma/client";

export const supplierRepository = {
  create(data: { name: string; email?: string; phone?: string }) {
    return prisma.supplier.create({ data });
  },
  update(id: string, data: { name: string; email?: string; phone?: string }) {
    return prisma.supplier.update({ where: { id }, data });
  },
  delete(id: string) {
    return prisma.supplier.delete({ where: { id } });
  },
  findById(id: string) {
    return prisma.supplier.findUnique({ where: { id } });
  },
  findMany(skip: number, take: number, search: string) {
    return prisma.supplier.findMany({
      where: search ? { name: { contains: search, mode: "insensitive" } } : undefined,
      orderBy: { createdAt: "desc" },
      skip,
      take
    });
  },
  count(search: string) {
    return prisma.supplier.count({
      where: search ? { name: { contains: search, mode: "insensitive" } } : undefined
    });
  }
};
