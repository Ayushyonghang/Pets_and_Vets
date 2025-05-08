import ProductCard from "../../components/Product";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  availableUnits: number;
  freeShipping: boolean;
  returnPolicy: boolean;
  category: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
  };
  policies: {
    id: string;
    policyType: string;
    description: string;
    duration: number;
  }[];
};

const ProductList = () => {
  const navigate = useNavigate();
  const { id: categoryId } = useParams<{ id: string }>();
  const [productss, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const abortController = new AbortController();

    const fetchCategoryRelatedProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          `http://localhost:3000/api/products/categories/${categoryId}`,
          {
            withCredentials: true,
            signal: abortController.signal,
          }
        );

        if (response.status === 200) {
          setProducts(response.data.products);
        } else {
          throw new Error("Failed to fetch categories");
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching categories:", error);
        }
      }
    };

    fetchCategoryRelatedProducts();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-10">Available Products</h1>
      <div className="flex flex-wrap gap-6">
        {productss.map((product) => (
          <ProductCard
            onClick={() => navigate(`/products/${product.id}`)}
            key={product.id}
            image={product.imageUrl}
            name={product.name}
            price={product.price.toString()}
            discount="15% off"
            rating={4.5}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
