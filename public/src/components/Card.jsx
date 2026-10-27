export default function Card({ product }) {
  return (
    <div className="card bg-base-100 w-60 shadow-sm">
      <figure>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-40 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>Rp {product.price.toLocaleString("id-ID")}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Lihat Detail</button>
        </div>
      </div>
    </div>
  );
}