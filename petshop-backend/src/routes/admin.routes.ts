import { FastifyInstance } from "fastify";
import { getAllUsers, getAllProducts } from "../controllers/admin.controller";
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller";

export default async function adminRoutes(fastify: FastifyInstance) {
  fastify.get("/users", getAllUsers);
  fastify.get("/products", getAllProducts);
  fastify.get("/categories", getAllCategories);
  fastify.get("/categories/:id", getCategory);
  fastify.post("/categories", createCategory);
  fastify.put("/categories/:id", updateCategory);
  fastify.delete("/categories/:id", deleteCategory);
}
