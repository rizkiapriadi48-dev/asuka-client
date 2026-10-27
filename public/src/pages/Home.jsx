import { useState } from "react";
import Card from "../components/Card";

const dummyProducts = [
  {
    id: 1,
    name: "Johnson's Baby Shampoo",
    price: 35000,
    imageUrl: "https://placehold.co/300x200?text=Shampoo",
  },
  {
    id: 2,
    name: "Johnson's Baby Powder",
    price: 28000,
    imageUrl: "https://placehold.co/300x200?text=Powder",
  },
  {
    id: 3,
    name: "Johnson's Baby Lotion",
    price: 42000,
    imageUrl: "https://placehold.co/300x200?text=Lotion",
  },
  {
    id: 4,
    name: "Johnson's Baby Oil",
    price: 31000,
    imageUrl: "https://placehold.co/300x200?text=Oil",
  },
];

export default function Home() {
  const [sort, setSort] = useState("DESC");

  function handleSort(e) {
    setSort(e.target.value);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* search */}
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
          <input type="email" placeholder="mail@site.com" required />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>

        {/* filter */}
        <form className="filter">
          <input className="btn btn-square" type="reset" value="×" />
          <input
            className="btn"
            type="radio"
            name="frameworks"
            aria-label="Lotion"
          />
          <input
            className="btn"
            type="radio"
            name="frameworks"
            aria-label="Oil"
          />
          <input
            className="btn"
            type="radio"
            name="frameworks"
            aria-label="Powder"
          />
        </form>

        {/* sort */}
        <select className="select w-40" value={sort} onChange={handleSort}>
          <option value="DESC">Terbaru</option>
          <option value="ASC">Terlama</option>
        </select>
      </div>

      {/* daftar card */}
      <div className="flex flex-wrap gap-4">
        {dummyProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

      {/* pagination */}
      <div className="join">
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div>
    </div>
  );
}
