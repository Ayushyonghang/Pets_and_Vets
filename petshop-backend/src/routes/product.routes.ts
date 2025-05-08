import { FastifyInstance } from "fastify";
import {
  addProduct,
  getProduct,
  getAllProductsHandler,
  editProduct,
  removeProduct,
  getAllCategoriesHandler,
  getProductsByCategory,
  searchProducts,
} from "../controllers/product.controller";

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.post("/", addProduct);
  fastify.get("/:id", getProduct);
  fastify.get("/", getAllProductsHandler);
  fastify.get("/categories", getAllCategoriesHandler);
  fastify.get("/categories/:categoryId", getProductsByCategory);
  fastify.put("/:id", editProduct);
  fastify.get("/search", searchProducts);
  fastify.delete("/:id", removeProduct);
}
