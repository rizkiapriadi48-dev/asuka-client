import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Toastify from 'toastify-js'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sort, setSort] = useState("DESC");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pages = generatePages();

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
      setTotalPage(data.totalPage);
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
    e.preventDefault();
    
  }

  function generatePages() {
    const array = [];
    for (let i = 1; i <= totalPage; i++) {
      array.push(i);
    }
    return array;
  }
  function handlePages(page){
    setPage(page)
  }
   function handlePrevious() {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    function handleNext() {
        if (page < totalPage) {
            setPage(page + 1)
        }
    }

  function handleFilter(value) {
    setPage(1);
    setFilter(value);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

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
              className="peer h-full w-full outline-none text-sm text-amber-50 pr-2"
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
            All
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
          <option value="DESC">Latest</option>
          <option value="ASC">Oldest</option>
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
     <nav className="flex items-center justify-center gap-x-1">
                <button
                    type="button"
                    className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
                    onClick={handlePrevious}
                    disabled={page <= 1 ? true : false}
                >
                    <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="{2}"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                    <span>Prev</span>
                </button>

                <div className="flex items-center gap-x-1">
                    {pages.map((pages) => {
                        return (
                            <div key={pages}>
                                <button
                                    type="button"
                                    className={pages === page ? "min-h-[38px] min-w-[38px] flex justify-center items-center bg-purple-400 py-2 px-3 text-sm border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm"}
                                    onClick={() => handlePages(pages)}
                                >
                                    {pages}
                                </button>
                            </div>
                        )
                    })}
                </div>

                <button
                    type="button"
                    className="min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm disabled:bg-purple-400"
                    onClick={handleNext}
                    disabled={page >= totalPage ? true : false}
                >
                    <span>Next</span>
                    <svg
                        className="shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="{2}"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </nav>
    </div>
  );
}
