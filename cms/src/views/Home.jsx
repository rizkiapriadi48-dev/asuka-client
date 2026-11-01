import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Toastify from "toastify-js";
import Button from "../components/Button";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://asoka-server.yayeh.web.id/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );
      setProducts(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    } finally {
      setLoading(false);
    }
  }
  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `https://asoka-server.yayeh.web.id/categories`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );

      setCategories(data.data);
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }
  async function handleDelete(id, name) {
    try {
      const { data } = await axios.delete(
        `https://asoka-server.yayeh.web.id/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );
      Toastify({
        text: "Success deleted",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#34D399",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
      fetchProduct();
    } catch (error) {
      Toastify({
        text: error.response.data.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#F87171",
          color: "black",
          border: "solid #000000",
          borderRadius: "8px",
          boxShadow: "2px 2px black",
        },
      }).showToast();
    }
  }
  function categoryName(categoryId) {
    const found = categories.find((c) => c.id === categoryId);
    return found ? found.name : categoryId;
  }
  useEffect(() => {
    (fetchCategories(), fetchProduct());
  }, []);
  const linkBtn =
    "py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium shadow-[2px_2px_0px_rgba(0,0,0,1)] text-amber-50";

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

      {loading ? (
        <p className="text-center mt-20 text-xl font-bold">Loading...</p>
      ) : (
        <div className="overflow-x-auto border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white">
          <table className="w-full text-left">
            <thead className="bg-yellow-400 border-b-2 border-black">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Gambar</th>
                <th className="p-3">Nama</th>
                <th className="p-3">Harga</th>
                <th className="p-3">Stok</th>
                <th className="p-3">Kategori</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-black">
                  <td className="p-3 text-black font-bold">{product.id}</td>
                  <td className="p-3">
                    <img
                      src={
                        product.imageUrl ||
                        "https://placehold.co/80x60?text=No+Image"
                      }
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/80x60?text=No+Image";
                      }}
                      className="w-20 h-14 object-cover border-2 border-black rounded-lg"
                    />
                  </td>
                  <td className="p-3 font-bold text-black">{product.name}</td>
                  <td className="p-3 text-black">
                    Rp {Number(product.price).toLocaleString("id-ID")}
                  </td>
                  <td className="p-3 text-black">{product.stock}</td>
                  <td className="p-3 text-black">{categoryName(product.categoryId)}</td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/edit/${product.id}`}
                        className={`${linkBtn} bg-blue-400 hover:bg-blue-500`}
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/upload/${product.id}`}
                        className={`${linkBtn} bg-green-400 hover:bg-green-500`}
                      >
                        Upload
                      </Link>
                      <Button
                        nameProp={"Delete"}
                        onClick={() => handleDelete(product.id, product.name)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <p className="text-center p-6">Belum ada produk.</p>
          )}
        </div>
      )}
    </>
  );
}
