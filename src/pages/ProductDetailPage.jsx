import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch"; // ← refactor pakai custom hook
import { useWishlist } from "../context/WishlistContext"; // ← context wishlist

function ProductDetailPage() {
  const { productId } = useParams();
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${productId}`);
  const { addToWishlist } = useWishlist();

  if (loading) return <p>Loading detail produk...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Produk tidak ditemukan.</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} width={200} />
      <p>{product.description}</p>
      <p><strong>Harga:</strong> ${product.price}</p>
      <p><strong>Kategori:</strong> {product.category}</p>
      
      {/* Tombol Wishlist tetap dipertahankan */}
      <button onClick={() => addToWishlist(product)}>💖 Tambahkan ke Wishlist</button>
    </div>
  );
}

export default ProductDetailPage;
