import ProductForm from "../components/ProductForm";
import Toastify from "toastify-js";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  async function handleSubmit(e, form) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://asoka-server.yayeh.web.id/products/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        },
      );

      navigate("/");
      Toastify({
        text: data.message,
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
      console.log(error);

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

  async function fetchProduct() {
    try {
      const { data } = await axios.get(
        `https://asoka-server.yayeh.web.id/products/${id}`, {
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
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <ProductForm
        nameProp={"Edit Product"}
        handleSubmit={handleSubmit}
        product={product}
      />
    </>
  );
}
