import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function WishlistCard({ product, onRemove }) {

    const navigate = useNavigate();

    return (

        <motion.div

            whileHover={{
                y: -8,
                transition: { duration: 0.2 }
            }}

            className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-gray-100
                bg-white
                shadow-md
                transition
                hover:shadow-2xl
            "

        >

            {/* Image */}

            <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gray-50">

                <img
                    src={product.image_url}
                    alt={product.name}
                    className="
                        max-h-full
                        max-w-full
                        object-contain
                        p-6"
                />

                {/* Wishlist Badge */}

                <button

                    onClick={() => onRemove(product.product_id)}

                    className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        shadow-lg
                        transition
                        hover:bg-red-50
                    "

                >

                    <Heart
                        size={20}
                        className="fill-red-500 text-red-500"
                    />

                </button>

            </div>

            {/* Details */}

            <div className="space-y-4 p-5">

                <div>

                    <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">

                        {product.name}

                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">

                        {product.description}

                    </p>

                </div>

                <div className="flex items-center justify-between">

                    <span className="text-3xl font-black text-indigo-600">

                        ₹{product.price}

                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

                        In Stock

                    </span>

                </div>

                {/* Buttons */}

                <div className="space-y-3">

                    <button

                        onClick={() =>
                            navigate(`/product/${product.product_id}`)
                        }

                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-indigo-700
                        "

                    >

                        <Eye size={18} />

                        View Product

                    </button>

                

                </div>

            </div>

        </motion.div>

    );

}

export default WishlistCard;    