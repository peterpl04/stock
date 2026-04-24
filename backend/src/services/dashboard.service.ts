import { prisma } from "../prisma/client";
import { productRepository } from "../repositories/product.repository";
import { stockMovementRepository } from "../repositories/stock-movement.repository";

export const dashboardService = {
  async getSummary() {
    const [totalProducts, lowStock, topMoving, values] = await Promise.all([
      prisma.product.count(),
      productRepository.lowStock(),
      stockMovementRepository.topMovingProducts(5),
      productRepository.totalValue()
    ]);

    const totalStockValue = values.reduce((acc, item) => {
      const quantity = Number(item.quantity || 0);
      const cost = Number(item.costPrice || 0);
      return acc + quantity * cost;
    }, 0);

    return {
      totalProducts,
      lowStockCount: lowStock.length,
      lowStockItems: lowStock,
      topMovingProducts: topMoving,
      totalStockValue
    };
  }
};
