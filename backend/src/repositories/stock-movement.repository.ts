import { MovementType, Prisma } from "@prisma/client";
import { prisma } from "../prisma/client";

export const stockMovementRepository = {
  create(data: { type: MovementType; quantity: number; productId: string; userId: string }) {
    return prisma.$transaction(async (tx) => {
      const product = await tx.product.findUnique({ where: { id: data.productId } });

      if (!product) {
        throw new Error("Produto nao encontrado");
      }

      const nextQuantity = data.type === "ENTRY" ? product.quantity + data.quantity : product.quantity - data.quantity;

      if (nextQuantity < 0) {
        throw new Error("Estoque insuficiente para saida");
      }

      await tx.product.update({
        where: { id: data.productId },
        data: { quantity: nextQuantity }
      });

      return tx.stockMovement.create({
        data,
        include: {
          product: true,
          user: { select: { id: true, name: true, email: true } }
        }
      });
    });
  },
  findMany(skip: number, take: number, filters: { from?: Date; to?: Date; productId?: string; type?: MovementType }) {
    const where: Prisma.StockMovementWhereInput = {
      productId: filters.productId,
      type: filters.type,
      createdAt:
        filters.from || filters.to
          ? {
              gte: filters.from,
              lte: filters.to
            }
          : undefined
    };

    return prisma.stockMovement.findMany({
      where,
      include: {
        product: { select: { id: true, name: true, code: true } },
        user: { select: { id: true, name: true, email: true } }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take
    });
  },
  count(filters: { from?: Date; to?: Date; productId?: string; type?: MovementType }) {
    return prisma.stockMovement.count({
      where: {
        productId: filters.productId,
        type: filters.type,
        createdAt:
          filters.from || filters.to
            ? {
                gte: filters.from,
                lte: filters.to
              }
            : undefined
      }
    });
  },
  topMovingProducts(limit = 5) {
    return prisma.stockMovement.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: limit
    });
  }
};
