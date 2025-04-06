import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - Halaman Tidak Ditemukan 😵</h1>
      <p>Maaf, halaman yang kamu cari tidak tersedia.</p>
      <Link to="/" style={{ display: "inline-block", marginTop: "1rem", padding: "0.5rem 1rem", backgroundColor: "#007bff", color: "#fff", textDecoration: "none", borderRadius: "5px" }}>
        🔙 Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;
