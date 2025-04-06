import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductCard from "../components/ProductCard";

function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();

  const {
    data: items,
    loading,
    error,
  } = useFetch(`https://fakestoreapi.com/products/category/${category}`);

  const { data: categories } = useFetch("https://fakestoreapi.com/products/categories");

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    if (selected) {
      navigate(`/kategori/${selected}`);
    }
  };

  const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  if (loading) return <p>Loading kategori...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Kategori: {capitalize(category)}</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="category-dropdown">Ganti Kategori: </label>
        <select id="category-dropdown" onChange={handleCategoryChange} defaultValue={category}>
          <option disabled>-- Pilih kategori --</option>
          {categories?.map((cat) => (
            <option key={cat} value={cat}>{capitalize(cat)}</option>
          ))}
        </select>
      </div>

      {items?.length === 0 ? (
        <p>Tidak ada produk dalam kategori ini.</p>
      ) : (
        <div className="product-grid">
          {items.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
