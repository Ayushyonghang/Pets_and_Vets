import { FastifyRequest, FastifyReply } from "fastify";
import {
  createProduct,
  getProductById,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllProductCategories,
  getProductsByCategoryId,
} from "../services/product.service";
import prisma from "../config/db";

export const addProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const product = await createProduct(req.body);
    reply.status(201).send({ product });
  } catch (error) {
    reply.status(400).send({ message: "Error creating product", error });
  }
};

export const getProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  try {
    const product = await getProductById(id);
    if (!product)
      return reply.status(404).send({ message: "Product not found" });
    reply.send({ product });
  } catch (error) {
    reply.status(400).send({ message: "Error getting product details", error });
  }
};

export const getAllProductsHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const products = await getAllProducts();
  reply.send({ products });
};

export const editProduct = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  try {
    const updatedProduct = await updateProduct(id, req.body);
    reply.send({ updatedProduct });
  } catch (error) {
    reply.status(400).send({ message: "Error updating product", error });
  }
};

export const removeProduct = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = req.params as { id: string };
  try {
    await deleteProduct(id);
    reply.send({ message: "Product deleted successfully" });
  } catch (error) {
    reply.status(400).send({ message: "Error deleting product", error });
  }
};

export const getAllCategoriesHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const categories = await getAllProductCategories();
    reply.send({ categories });
  } catch (error) {
    reply.status(500).send({ message: "Error fetching categories", error });
  }
};

export const getProductsByCategory = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const { categoryId } = req.params as { categoryId: string };
  try {
    const products = await getProductsByCategoryId(categoryId);
    if (!products.length) {
      return reply
        .status(404)
        .send({ message: "No products found for this category" });
    }
    reply.send({ products });
  } catch (error) {
    reply
      .status(500)
      .send({ message: "Error fetching products by category", error });
  }
};

interface SearchQueryParams {
  query?: string;
}

export const searchProducts = async (
  req: FastifyRequest<{ Querystring: SearchQueryParams }>,
  reply: FastifyReply
) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      const products = await getAllProducts();
      return reply.send({ products });
    }

    const searchTerm = query.trim();

    const products = await prisma.products.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm } },
          { category: { name: { contains: searchTerm } } },
          { description: { contains: searchTerm } },
        ],
      },
      include: {
        category: true,
        policies: true,
        attributes: true,
        animalTargets: {
          include: {
            animalType: true,
          },
        },
        productType: {
          include: {
            attributes: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    reply.send({ products });
  } catch (error) {
    console.error("Error searching products:", error);
    reply.status(500).send({ error: "Failed to search products" });
  }
};
