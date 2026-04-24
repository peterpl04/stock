import { MovementType } from "@prisma/client";
import { stockMovementRepository } from "../repositories/stock-movement.repository";

export const stockMovementService = {
  create(data: { type: MovementType; quantity: number; productId: string; userId: string }) {
    return stockMovementRepository.create(data);
  },
  async list(
    skip: number,
    limit: number,
    filters: { from?: Date; to?: Date; productId?: string; type?: MovementType }
  ) {
    const [items, total] = await Promise.all([
      stockMovementRepository.findMany(skip, limit, filters),
      stockMovementRepository.count(filters)
    ]);

    return { items, total };
  }
};
