import type { ProductDataType } from "../data/Interface";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: ProductDataType }) {
  return (
    <div className="product-card">
      <img src={product.image} className="product-image-card" />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">{product.price}</p>
        <div className="product-card-actions">
          <Link to="" className="btn btn-secondary">
            View details
          </Link>
          <button className="btn btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
