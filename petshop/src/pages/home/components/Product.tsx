import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { type Product } from "../../../context/DataContext";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  // const discount = product.originalPrice
  //   ? Math.round(
  //       ((product.originalPrice - product.price) / product.originalPrice) * 100
  //     )
  //   : 0;

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{discount}%
          </div>
        )} */}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center mb-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(Math.random() * 5) + 1
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          {/* <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span> */}
        </div>

        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 flex-grow">
          {product.name}
        </h3>

        <div className="flex items-center mt-auto">
          {product.originalPrice ? (
            <>
              <span className="font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-500 text-sm line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-bold text-gray-900">
              Rs. {Number(product.price).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
