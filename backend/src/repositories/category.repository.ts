import { prisma } from "../prisma/client";

export const categoryRepository = {
  create(name: string) {
    return prisma.category.create({ data: { name } });
  },
  update(id: string, name: string) {
    return prisma.category.update({ where: { id }, data: { name } });
  },
  delete(id: string) {
    return prisma.category.delete({ where: { id } });
  },
  findById(id: string) {
    return prisma.category.findUnique({ where: { id } });
  },
  findMany(skip: number, take: number, search: string) {
    return prisma.category.findMany({
      where: search ? { name: { contains: search, mode: "insensitive" } } : undefined,
      orderBy: { createdAt: "desc" },
      skip,
      take
    });
  },
  count(search: string) {
    return prisma.category.count({
      where: search ? { name: { contains: search, mode: "insensitive" } } : undefined
    });
  }
};
