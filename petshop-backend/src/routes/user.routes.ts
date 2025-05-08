import { FastifyInstance } from "fastify";
import {
  addUser,
  getUser,
  getAllUsersHandler,
  editUser,
  removeUser,
} from "../controllers/user.controller";

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post("/", addUser);

  fastify.get("/:id", getUser);

  fastify.get("/", getAllUsersHandler);

  fastify.put("/:id", editUser);

  fastify.delete("/:id", removeUser);
}
