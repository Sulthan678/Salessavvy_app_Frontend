import API from "./api";

const BASE_URL = "/api/wishlist";

const WishlistService = {

    toggleWishlist(productId) {
        return API.post(
            `${BASE_URL}/toggle/${productId}`,
            {});
    },

    getWishlist() {
        return API.get(BASE_URL);
    },

    getWishlistCount() {
        return API.get(`${BASE_URL}/count`);
    },

    checkWishlist(productId) {
        return API.get(
            `${BASE_URL}/check/${productId}`);
    }

};

export default WishlistService;