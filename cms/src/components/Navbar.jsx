import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <nav className="sticky top-0 z-10 p-3 bg-purple-400 border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)] flex justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-bold px-6 cursor-pointer underline decoration-purple-200"
              : "text-2xl font-bold px-6 cursor-pointer"
          }
        >
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/add"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-bold px-6 cursor-pointer underline decoration-purple-200"
              : "text-2xl font-bold px-6 cursor-pointer"
          }
        >
          <span>Add Product</span>
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-bold px-6 cursor-pointer underline decoration-purple-200"
              : "text-2xl font-bold px-6 cursor-pointer"
          }
        >
          <span>Categories</span>
        </NavLink>
        <NavLink
          to="/add-staff"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-bold px-6 cursor-pointer underline decoration-purple-200"
              : "text-2xl font-bold px-6 cursor-pointer"
          }
        >
          <span>add-staff</span>
        </NavLink>
        <a
          onClick={handleLogout}
          className="text-2xl font-bold px-6 cursor-pointer text-red-700"
        >
          <span>Logout</span>
        </a>
      </nav>
    </>
  );
}
