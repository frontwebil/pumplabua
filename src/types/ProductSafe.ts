import { Product, Variant } from "@prisma/client";

export type ProductSafe = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
  variants: Variant[];
};
