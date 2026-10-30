import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState("DESC");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("1");
  const [filter, setFilter] = useState("");
  const [totalPage, setTotalPage] = useState("1");

  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        `https://asoka-server.yayeh.web.id/pub/categories`,
      );
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProduct() {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `https://asoka-server.yayeh.web.id/pub/products`,
        {
          params: { search, filter, page, sort },
        },
      );
      setProducts(data.data);
      setTotalPage(data.totalPage || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [search, filter, page, sort]);

  function handleSort(e) {
    setSort(e.target.value);
    setPage(1);
  }

  function handleSearch(e) {
    setPage(1);
    setSearch(e.target.value);
  }

  function handleFilter(value) {
    setPage(1);
    setFilter(value);
  }

  return (
    
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* search */}
        <div>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-800 pr-2"
              type="text"
              id="search"
              placeholder="Product"
              onChange={handleSearch}
            />
          </label>
        </div>

        {/* filter */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`btn ${filter === "" ? "btn-primary" : ""}`}
            onClick={() => handleFilter("")}
          >
            Semua
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`btn ${String(filter) === String(c.id) ? "btn-primary" : ""}`}
              onClick={() => handleFilter(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* sort */}
        <select className="select w-40" value={sort} onChange={handleSort}>
          <option value="DESC">Terbaru</option>
          <option value="ASC">Terlama</option>
        </select>
      </div>

      {loading ? (
        <>
          <span className="loading loading-dots loading-xs"></span>
        </>
      ) : (
        <>
          {/* daftar card */}
          <div className="flex flex-wrap gap-4">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </>
      )}

      {/* pagination */}
      <div className="join">
        <button
          className="join-item btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          1
        </button>
      </div>
    </div>
  );
}
