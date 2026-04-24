import { categoryRepository } from "../repositories/category.repository";

export const categoryService = {
  create(name: string) {
    return categoryRepository.create(name);
  },
  async update(id: string, name: string) {
    const existing = await categoryRepository.findById(id);
    if (!existing) {
      throw new Error("Categoria nao encontrada");
    }
    return categoryRepository.update(id, name);
  },
  async remove(id: string) {
    const existing = await categoryRepository.findById(id);
    if (!existing) {
      throw new Error("Categoria nao encontrada");
    }
    return categoryRepository.delete(id);
  },
  async list(skip: number, limit: number, search: string) {
    const [items, total] = await Promise.all([
      categoryRepository.findMany(skip, limit, search),
      categoryRepository.count(search)
    ]);

    return { items, total };
  }
};
