import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Toastify from "toastify-js";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://asoka-server.yayeh.web.id/pub/products/${id}`,
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
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      {loading ? (
        <span className="loading loading-dots loading-xs"></span>
      ) : (
        <div className="flex flex-start bg-yellow-400 border-2 border-black p-5 rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full mt-10">
          <div>
            <img
              src={product.imageUrl}
              alt="product image"
              className="border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full"
            />
          </div>
          <div className="flex mx-10 flex-col w-1/2 justify-between">
            <b className="text-4xl mb-5">{product.name}</b>
            <p className="h-full">{product.description}</p>
            <div>
              <Link to="/" className="fa-solid fa-arrow-left fa-2xl mb-5">
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
