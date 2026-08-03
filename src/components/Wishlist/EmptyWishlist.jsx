import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EmptyWishlist() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-28">

            <Heart
                size={80}
                className="mb-5 text-gray-300"
            />

            <h2 className="text-3xl font-bold">
                Your Wishlist is Empty
            </h2>

            <p className="mt-3 text-gray-500">
                Save products you love and they'll appear here.
            </p>

            <button
                onClick={() => navigate("/customerhome")}
                className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
                Continue Shopping
            </button>

        </div>
    );
}

export default EmptyWishlist;