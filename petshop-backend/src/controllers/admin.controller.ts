import { FastifyRequest, FastifyReply } from "fastify";
import prisma from "../config/db";

export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await prisma.users.findMany();
    reply.send({ users });
  } catch (error) {
    reply.status(500).send({ message: "Error fetching users" });
  }
};

export const getAllProducts = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const products = await prisma.products.findMany({
      include: { category: true, policies: true },
    });
    reply.send({ products });
  } catch (error) {
    reply.status(500).send({ message: "Error fetching products" });
  }
};
