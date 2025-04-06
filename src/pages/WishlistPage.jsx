import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div>
      <h1>Wishlist Saya</h1>
      {wishlist.length === 0 ? (
        <p>💔 Belum ada produk di wishlist.</p>
      ) : (
        <div className="product-grid">
          {wishlist.map((item) => (
            <ProductCard key={item.id} product={item} isWishlistPage />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
