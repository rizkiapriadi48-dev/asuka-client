import { NavLink, useNavigate } from "react-router"

export default function Navbar() {
    const navigate = useNavigate()

    async function handleLogout() {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            {/* navbar */}
            <nav className="sticky top-0 z-10 p-3 bg-purple-400 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] flex justify-center">
                <div>
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "text-2xl font-bold px-6 cursor-pointer underline" : "text-2xl font-bold px-6 cursor-pointer"
                    }>
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/add" className={({ isActive }) =>
                        isActive ? "text-2xl font-bold px-6 cursor-pointer underline" : "text-2xl font-bold px-6 cursor-pointer"
                    }>
                        <span>Add Product</span>
                    </NavLink>
                    <a className="text-2xl font-bold px-6 cursor-pointer text-white"
                        onClick={handleLogout}>
                        <span>Logout</span>
                    </a>
                </div>
            </nav>
            <br />
        </>
    )
}