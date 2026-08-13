import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import WishlistService from "../services/WishlistService";
import WishlistGrid from "../components/Wishlist/WishlistGrid";
import EmptyWishlist from "../components/Wishlist/EmptyWishlist";
import toast from "react-hot-toast";

function WishlistPage() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const response = await WishlistService.getWishlist();
            console.log(response.data);
            setWishlistItems(response.data.wishlist);
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to load wishlist");
        } finally {
            setLoading(false);
        }
    };

    const removeWishlistItem = async (productId) => {
        try {
            await WishlistService.toggleWishlist(productId);

            setWishlistItems((prev) =>
                prev.filter(
                    (item) => item.product_id !== productId
                )
            );

            toast.success("Removed from wishlist");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <>
            <Header />

            <main className="min-h-screen py-10 bg-[#F5F7FB]">
                <div className="mx-auto max-w-7xl px-6">

                    <h1 className="mb-8 text-3xl font-bold">
                        My Wishlist
                    </h1>

                    {loading ? (
                        <p className="text-center text-gray-500">
                            Loading...
                        </p>
                    ) : wishlistItems.length === 0 ? (
                        <EmptyWishlist />
                    ) : (
                        <WishlistGrid
                            items={wishlistItems}
                            onRemove={removeWishlistItem}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default WishlistPage;