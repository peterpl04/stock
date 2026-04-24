import { api } from "./api";
import { Category, Supplier, StockMovement } from "../types/api";

export const genericCrudService = {
  listCategories() {
    return api.get<{ items: Category[] }>("/categories");
  },
  createCategory(name: string) {
    return api.post("/categories", { name });
  },
  deleteCategory(id: string) {
    return api.delete(`/categories/${id}`);
  },
  listSuppliers() {
    return api.get<{ items: Supplier[] }>("/suppliers");
  },
  createSupplier(payload: { name: string; email?: string; phone?: string }) {
    return api.post("/suppliers", payload);
  },
  deleteSupplier(id: string) {
    return api.delete(`/suppliers/${id}`);
  },
  listMovements(from?: string, to?: string) {
    return api.get<{ items: StockMovement[] }>("/stock-movements", { params: { from, to } });
  },
  createMovement(payload: { type: "ENTRY" | "EXIT"; quantity: number; productId: string }) {
    return api.post("/stock-movements", payload);
  }
};
