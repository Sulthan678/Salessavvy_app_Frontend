import { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import WishlistGrid from "../components/Wishlist/WishlistGrid";
import EmptyWishlist from "../components/Wishlist/EmptyWishlist";
import toast from "react-hot-toast";
import { useWishlist } from "../context/WishlistContext";

function WishlistPage() {
    const { wishlistItems, setWishlistItems, fetchWishlistItems, removeFromWishlist } = useWishlist();
    const loading = false;

    useEffect(() => {
        fetchWishlistItems();
    }, []);

    const handleRemoveItem = async (productId) => {
        const success = await removeFromWishlist(productId);
        
        if (success) {
            // Update local state
            setWishlistItems((prev) =>
                prev.filter((item) => item.product_id !== productId)
            );
            toast.success("Removed from wishlist");
        } else {
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
                            onRemove={handleRemoveItem}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default WishlistPage;