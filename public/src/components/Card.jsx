import { Link } from "react-router";

export default function Card({ product }) {
    return (
        <>
            <div key={product.id}>
                {/* card */}
                <div className="flex flex-col flex-start items-center bg-yellow-400 border-2 border-black p-5 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full">
                    <div>
                        <Link to={`/detail/${product.id}`}>
                            <img
                                src={product.imageUrl}
                                alt="product imageUrl"
                                className="border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col divide-y divide-black">
                        <b className="mt-5">{product.name}</b>
                        <p className="line-clamp-3">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}