import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/Product";
import type { ProductDataType } from "../data/Interface";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState<ProductDataType | null>(null);
  const navigate = useNavigate();

  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const foundProduct = getProductById(id ?? "");

    if (!foundProduct) {
      navigate("/");
      return;
    }
    console.log(foundProduct);
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  const itemQuantity = cartItems.find(
    (item) => item.id === product.id,
  )?.quantity;

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart{" "}
              {itemQuantity !== undefined ? ` (${itemQuantity})` : ""}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
