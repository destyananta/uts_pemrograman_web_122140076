import "../styles/ProductCard.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import PropTypes from "prop-types"; // ← Import PropTypes

function ProductCard({ product, isWishlistPage = false }) {
  const { addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>

      <Link to={`/products/${product.id}`} className="details-button">
        Lihat Detail
      </Link>

      {isWishlistPage ? (
        <button
          onClick={() => removeFromWishlist(product.id)}
          className="wishlist-button remove-button"
        >
          🗑️ Hapus dari Wishlist
        </button>
      ) : (
        <button
          onClick={() => addToWishlist(product)}
          className="wishlist-button"
        >
          💖 Tambahkan ke Wishlist
        </button>
      )}
    </div>
  );
}

// ✅ Tambahkan PropTypes
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  isWishlistPage: PropTypes.bool,
};

export default ProductCard;
