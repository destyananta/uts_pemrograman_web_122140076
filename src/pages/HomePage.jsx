import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { useWishlist } from "../context/WishlistContext";

function HomePage() {
  const navigate = useNavigate();
  const {
    data: products,
    loading,
    error,
  } = useFetch("https://fakestoreapi.com/products");
  const { data: categories } = useFetch(
    "https://fakestoreapi.com/products/categories"
  );

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const searchRef = useRef();
  const { addToWishlist } = useWishlist();

  // useEffect: fokus ke input & set produk awal saat data didapat
  useEffect(() => {
    if (products) {
      setFiltered(products);
      searchRef.current?.focus();
    }
  }, [products]);

  // useCallback: fungsi pencarian
  const handleSearch = useCallback(
    (e) => {
      const keyword = e.target.value.toLowerCase();
      setSearch(keyword);
      const result = products?.filter((p) =>
        p.title.toLowerCase().includes(keyword)
      );
      setFiltered(result);
    },
    [products]
  );

  // Navigasi berdasarkan kategori
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      navigate(`/kategori/${selected}`);
    }
  };

  // useMemo: menyortir produk berdasarkan harga (terendah ke tertinggi)
  const sortedFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => a.price - b.price);
  }, [filtered]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Daftar Produk</h1>

      {/* Input pencarian */}
      <input
        type="text"
        ref={searchRef}
        placeholder="Cari produk..."
        value={search}
        onChange={handleSearch}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "100%" }}
      />

      {/* Dropdown kategori */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="category-dropdown" style={{ marginRight: "0.5rem" }}>
          Pilih Kategori:
        </label>
        <select
          id="category-dropdown"
          onChange={handleCategoryChange}
          defaultValue=""
        >
          <option value="" disabled>
            -- Pilih kategori --
          </option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Grid produk */}
      {sortedFiltered.length === 0 ? (
        <p>Tidak ada produk yang cocok.</p>
      ) : (
        <div className="product-grid">
          {sortedFiltered.map((product) => (
            <ProductCard key={product.id} product={product}>
              <button
                onClick={() => addToWishlist(product)}
                className="wishlist-button"
              ></button>
            </ProductCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
