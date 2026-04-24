export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type Category = {
  id: string;
  name: string;
};

export type Supplier = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
};

export type Product = {
  id: string;
  name: string;
  code: string;
  barcode?: string;
  quantity: number;
  minStock: number;
  costPrice: string;
  salePrice: string;
  imageUrl?: string;
  categoryId: string;
  supplierId: string;
  category?: Category;
  supplier?: Supplier;
};

export type StockMovement = {
  id: string;
  type: "ENTRY" | "EXIT";
  quantity: number;
  createdAt: string;
  product: { id: string; name: string; code: string };
  user: User;
};
