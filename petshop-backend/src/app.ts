import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import fjwt, { FastifyJWT } from "@fastify/jwt";
import fCookie from "@fastify/cookie";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import adminRoutes from "./routes/admin.routes";
import cartRoutes from "./routes/cart.routes";
import userRoutes from "./routes/user.routes";
import appointmentRoutes from "./routes/appointment.routes";
import * as dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: ["http://localhost:5173", "http://localhost:5111"],
  credentials: true,
});

fastify.register(fCookie, {
  secret: "some-secret-key",
  hook: "preHandler",
});

fastify.register(fjwt, {
  secret: process.env.JWT_SECRET!,
});

fastify.addHook("preHandler", (req, res, next) => {
  req.jwt = fastify.jwt;
  return next();
});

fastify.decorate(
  "authenticate",
  async (req: FastifyRequest, reply: FastifyReply) => {
    const token = req.cookies.access_token;
    if (!token) {
      return reply.status(401).send({ message: "Authentication required" });
    }
    const decoded = req.jwt.verify<FastifyJWT["user"]>(token);
    req.user = decoded;
  }
);

fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(productRoutes, { prefix: "/api/products" });
fastify.register(cartRoutes, { prefix: "/api/cart" });
fastify.register(appointmentRoutes, { prefix: "/api/appointments" });
fastify.register(adminRoutes, { prefix: "/api/admin" });
fastify.register(userRoutes, { prefix: "/api/users" });

export default fastify;
