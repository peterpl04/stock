import { supplierRepository } from "../repositories/supplier.repository";

export const supplierService = {
  create(data: { name: string; email?: string; phone?: string }) {
    return supplierRepository.create(data);
  },
  async update(id: string, data: { name: string; email?: string; phone?: string }) {
    const existing = await supplierRepository.findById(id);
    if (!existing) {
      throw new Error("Fornecedor nao encontrado");
    }
    return supplierRepository.update(id, data);
  },
  async remove(id: string) {
    const existing = await supplierRepository.findById(id);
    if (!existing) {
      throw new Error("Fornecedor nao encontrado");
    }
    return supplierRepository.delete(id);
  },
  async list(skip: number, limit: number, search: string) {
    const [items, total] = await Promise.all([
      supplierRepository.findMany(skip, limit, search),
      supplierRepository.count(search)
    ]);

    return { items, total };
  }
};
