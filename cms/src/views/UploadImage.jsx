import axios from "axios";
import Button from "../components/Button";
import Toastify from "toastify-js";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function UploadImage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        `https://asoka-server.yayeh.web.id/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );
      setProduct(data.data);
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
  async function handleUpload(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("imageUrl", file);

      const { data } = await axios.patch(
        `https://asoka-server.yayeh.web.id/products/${id}/image-url`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );
      navigate("/")
       Toastify({
              text: "Success upload",
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
  useEffect(()=>{
    fetchProduct()
  }, [])

  if (loading) {
    return <p className="text-center mt-20 text-xl font-bold">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Produk tidak ditemukan.</p>;
  }

  return(
     <>
      <form
        className="p-5 mt-5 max-w-xl mx-auto border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-green-400"
        onSubmit={handleUpload}
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Upload Gambar: {product.name}
        </h1>

        <img
          src={product.imageUrl || "https://placehold.co/400x250?text=No+Image"}
          alt={product.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/400x250?text=No+Image";
          }}
          className="w-full h-60 object-cover border-2 border-black rounded-2xl mb-4"
        />

        <input
          type="file"
          accept="image/*"
          className="bg-white w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button type="submit" nameProp={"Upload"} className="w-full">
          Upload
        </Button>
      </form>
    </>
  )
}
