import { useEffect, useState } from "react";
import {Heart, ShoppingCart, Star,Zap} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import QuantitySelector from "./QuantitySelector";
import TrustBadges from "./TrustBadges";
import ProductHighlights from "./ProductHighlights";
import WishlistService from "../../services/WishlistService";
import { addToCart } from "../../services/cartService";
import { useWishlist } from "../../context/WishlistContext";

function ProductInfo({ product, username }) {
   
    const navigate = useNavigate();
    const { addToWishlist, removeFromWishlist } = useWishlist();
    const [isWishlisted, setIsWishlisted] = useState(false);
    useEffect(() => {
    checkWishlist();
    }, [product.product_id]);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const originalPrice = Math.round(product.price * 1.4);
    
    const discount = Math.round(
        ((originalPrice - product.price) / originalPrice) * 100
    );
    
    //WISHLIST  
    const checkWishlist = async () => {

    try {

        const res = await WishlistService.checkWishlist(product.product_id);

        setIsWishlisted(res.data);

    } catch (err) {

        console.error(err);

    }

    };
    //---------
    const handleWishlist = async () => {

    if (wishlistLoading) return;

    setWishlistLoading(true);

    try {

        if (isWishlisted) {
            // Remove from wishlist
            const success = await removeFromWishlist(product.product_id);
            if (success) {
                setIsWishlisted(false);
                toast.success("💔 Removed from Wishlist");
            }
        } else {
            // Add to wishlist
            const success = await addToWishlist(product.product_id);
            if (success) {
                setIsWishlisted(true);
                toast.success("❤️ Added to Wishlist");
            }
        }

    } catch (err) {

        console.error(err);

        toast.error("Something went wrong");

    } finally {

        setWishlistLoading(false);

    }

    };


    //ADD TO CART======================>
        const handleAddToCart = async () => {
    try {

        await addToCart(product.product_id, quantity);

        toast.success("Added to cart!");

        return true;

    } catch (err) {
        console.error(err);
        toast.error("Failed to add product to cart");

        return false;
    }
    };

    //BUY NOW =======================>
    const handleBuyNow = async () => {

    const success = await handleAddToCart();
    if (success) {
        navigate("/cart");
    }
    };

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

            <button onClick={() => {
            document.getElementById("customer-reviews")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                    });
                }}
                    className="text-indigo-600 hover:underline" >
                    (128 Reviews)
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

            
            {/* WishList */}
            <div>

    <button
        onClick={handleWishlist}
        disabled={wishlistLoading}
        className={`flex items-center gap-3 rounded-2xl border px-5 py-3 font-semibold transition-all duration-300
        ${
            isWishlisted
                ? "border-red-200 bg-red-50 text-red-600"
                : "border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:text-red-500"
        }
        ${wishlistLoading ? "opacity-60 cursor-not-allowed" : ""}
        `}
        >
        <Heart
            size={20}
            className={`transition-all duration-300 ${
                isWishlisted
                    ? "fill-red-500 text-red-500 scale-110"
                    : ""
            }`}
        />

        {isWishlisted
            ? "Saved to Wishlist"
            : "Add to Wishlist"}

        </button>

        </div>

            
            {/* Description */}

            <p className="max-w-xl text-lg leading-8 text-gray-600">

                {product.description}

            </p>
            

            {/* Quantity */}

            <QuantitySelector quantity={quantity} setQuantity={setQuantity}
            stock={product.stock}/>

            {/* Buttons */}

            <div className="flex gap-3">

                <button
                    onClick={handleAddToCart}
                    className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
                >

                    <ShoppingCart size={20} />

                    Add to Cart

                </button>

                <button 
                    onClick={handleBuyNow}
                    className="flex flex-1 items-center justify-center gap-3 rounded-2xl border border-indigo-600 py-4 text-lg font-semibold text-indigo-600 transition hover:bg-indigo-50">

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