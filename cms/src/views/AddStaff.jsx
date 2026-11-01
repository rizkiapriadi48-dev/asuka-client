import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import Toastify from "toastify-js";

export default function AddStaffPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://asoka-server.yayeh.web.id/add-user`,
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

  const input =
    "bg-white w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] text-black";

  return (
    <>
      <form
        className="p-5 mt-5 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-blue-400"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-4 text-black">
          Add New Staff
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <div>
              <label className="font-bold text-black">
                Username (opsional)
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                autoComplete="off"
                className={input}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-bold text-black">Email</label>
              <input
                type="text"
                name="email"
                placeholder="staff@email.com"
                autoComplete="off"
                className={input}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-bold text-black">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                autoComplete="new-password"
                className={input}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="font-bold text-black">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                autoComplete="off"
                className={input}
                onChange={handleChange}
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-bold text-black">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter Address"
                autoComplete="off"
                className={input}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Button type="submit" nameProp={"add staff"} className="w-full">Add Staff</Button>
      </form>
    </>
  );
}
