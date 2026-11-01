import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";


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
    "bg-white w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]";

  return (
    <>
      <form
        className="p-5 mt-5 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-blue-400"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center mb-4">Add New Staff</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-bold">Username (opsional)</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              className={input}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-bold">Email</label>
            <input
              type="text"
              name="email"
              placeholder="staff@email.com"
              className={input}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-bold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className={input}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="font-bold">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter Phone Number"
              className={input}
              onChange={handleChange}
            />
          </div>
          <div className="md:col-span-2">
            <label className="font-bold">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter Address"
              className={input}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button nameProp={"Add Staff"}>
          Add Staff
        </Button>
      </form>
    </>
  );
}