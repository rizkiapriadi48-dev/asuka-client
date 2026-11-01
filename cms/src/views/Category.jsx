import axios from "axios";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchCategories() {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Daftar Category</h1>

      {loading ? (
        <p className="text-center mt-20 text-xl font-bold">Loading...</p>
      ) : (
        <div className="overflow-x-auto border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white">
          <table className="w-full text-left">
            <thead className="bg-yellow-400 border-b-2 border-black">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nama</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-black">
                  <td className="p-3 text-black">{c.id}</td>
                  <td className="p-3 font-bold text-black">{c.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <p className="text-center p-6">Belum ada category.</p>
          )}
        </div>
      )}
    </>
  );
}
