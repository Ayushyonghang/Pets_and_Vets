import prisma from "../config/db";

export const createProduct = async (productData: any) => {
  return prisma.products.create({
    data: productData,
  });
};

export const getProductById = async (id: string) => {
  return prisma.products.findUnique({
    where: { id },
    include: {
      category: true,
      policies: true,
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
      CartItems: {
        select: {
          id: true,
          quantity: true,
          price: true,
          cartId: true,
        },
      },
    },
  });
};

export const getAllProducts = async () => {
  return prisma.products.findMany({
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      productType: {
        select: {
          id: true,
          name: true,
        },
      },
      policies: true,
    },
  });
};

export const updateProduct = async (id: string, updateData: any) => {
  return prisma.products.update({
    where: { id },
    data: updateData,
  });
};

export const deleteProduct = async (id: string) => {
  return prisma.products.delete({
    where: { id },
  });
};

export const getAllProductCategories = async () => {
  return prisma.categories.findMany();
};

export const getProductsByCategoryId = async (categoryId: string) => {
  return prisma.products.findMany({
    where: { categoryId },
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
  });
};
