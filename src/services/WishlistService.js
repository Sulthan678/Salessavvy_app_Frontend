import axios from "axios";

const BASE_URL = "http://localhost:9090/api/wishlist";

const WishlistService = {

    toggleWishlist(productId) {
        return axios.post(
            `${BASE_URL}/toggle/${productId}`,
            {},
            {
                withCredentials: true,
            }
        );
    },

    getWishlist() {
        return axios.get(BASE_URL, {
            withCredentials: true,
        });
    },

    getWishlistCount() {
        return axios.get(`${BASE_URL}/count`, {
            withCredentials: true,
        });
    },

    checkWishlist(productId) {
        return axios.get(
            `${BASE_URL}/check/${productId}`,
            {
                withCredentials: true,
            }
        );
    }

};

export default WishlistService;