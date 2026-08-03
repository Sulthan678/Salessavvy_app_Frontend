import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WishlistService from "../../services/WishlistService";

function WishlistIcon() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchWishlistCount();
    }, []);

    const fetchWishlistCount = async () => {
        try {
            const response = await WishlistService.getWishlistCount();
            setCount(response.data);
        } catch (error) {
            console.error(error);
        }
    };

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

        {count > 0 && (
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
                {count}
            </span>
        )}
    </button>
);
}

export default WishlistIcon;