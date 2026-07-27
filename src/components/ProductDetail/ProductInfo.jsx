import { Star, ShoppingCart, Zap } from "lucide-react";
import QuantitySelector from "./QuantitySelector";
import TrustBadges from "./TrustBadges";
import ProductHighlights from "./ProductHighlights";

function ProductInfo({ product }) {

    const originalPrice = Math.round(product.price * 1.4);

    const discount = Math.round(
        ((originalPrice - product.price) / originalPrice) * 100
    );

    return (

        <div className="space-y-8">

            {/* Product Name */}

            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">

                {product.name}

            </h1>

            {/* Rating */}

            <div className="flex items-center gap-3">

                <div className="flex">

                    {[...Array(5)].map((_, index) => (

                        <Star
                            key={index}
                            size={20}
                            className="fill-yellow-400 text-orange-400"
                        />

                    ))}

                </div>

                <span className="font-semibold">
                    4.8
                </span>

                <button
                    className="text-indigo-600 hover:underline"
                >
                    (14 Reviews)
                </button>

            </div>

            {/* Price */}

            <div className="mt-10 border-y border-gray-200 py-6">

                <div className="text-5xl font-black text-indigo-600">

                    ₹{product.price}

                </div>

                <div className="mt-2 flex items-center gap-4">

                    <span className="text-2xl text-gray-400 line-through">

                        ₹{originalPrice}

                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">

                        {discount}% OFF

                    </span>

                </div>

            </div>

            {/* Description */}

            <p className="max-w-xl text-lg leading-8 text-gray-600">

                {product.description}

            </p>
            

            {/* Quantity */}

            <QuantitySelector />

            {/* Buttons */}

            <div className="flex gap-3">

                <button
                    className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
                >

                    <ShoppingCart size={20} />

                    Add to Cart

                </button>

                <button
                    className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-indigo-600 py-4 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >

                    <Zap size={20} />

                    Buy Now

                </button>

            </div>
            <TrustBadges />
            <ProductHighlights category={product.category}/>

        </div>

    );

}

export default ProductInfo;