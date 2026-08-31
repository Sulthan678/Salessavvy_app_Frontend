import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";

function WishlistIcon() {
    const navigate = useNavigate();
    const { wishlistCount } = useWishlist();

   return (
    <button
        onClick={() => navigate("/wishlist")}
        className="
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            shadow-sm
            transition-all
            duration-300
            hover:border-red-300
            hover:shadow-md
        "
    >
        <Heart
            size={26}
            className="
                text-gray-700
                transition-colors
                duration-300
                hover:text-red-500
            "
        />

        {wishlistCount > 0 && (
            <span
                className="
                    absolute
                    -right-1
                    -top-1
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    rounded-full
                    bg-red-500
                    text-xs
                    font-bold
                    text-white
                    ring-2
                    ring-white
                "
            >
                {wishlistCount}
            </span>
        )}
    </button>
);
}

export default WishlistIcon;