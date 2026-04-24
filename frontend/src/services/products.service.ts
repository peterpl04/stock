import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "./api";
import { Product } from "../types/api";

type ProductListResponse = {
  items: Product[];
  total: number;
  page: number;
  limit: number;
};

const CACHE_KEY = "@lato/products-cache";

export const productsService = {
  async list(page = 1, limit = 20, search = "") {
    try {
      const { data } = await api.get<ProductListResponse>("/products", {
        params: { page, limit, search }
      });

      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
      return data;
    } catch (error) {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached) as ProductListResponse;
      }
      throw error;
    }
  },
  async create(payload: {
    name: string;
    code: string;
    barcode?: string;
    quantity: number;
    minStock: number;
    costPrice: number;
    salePrice: number;
    categoryId: string;
    supplierId: string;
    imageUrl?: string;
  }) {
    const { data } = await api.post<Product>("/products", payload);
    return data;
  },
  async dashboard() {
    const { data } = await api.get<{
      totalProducts: number;
      lowStockCount: number;
      totalStockValue: number;
      lowStockItems: Array<{ id: string; name: string; quantity: number; minStock: number }>;
      topMovingProducts: Array<{ productId: string; _sum: { quantity: number | null } }>;
    }>("/dashboard/summary");
    return data;
  }
};
