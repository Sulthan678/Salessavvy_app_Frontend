import API from "./api";

// Get cart count
export const getCartCount = () => {
  return API.get("/api/cart/items/count");
};

// Add product to cart
export const addToCart = (productId, quantity = 1) => {
  return API.post("/api/cart/add", {
    productId,
    quantity
  });
};


// Get all cart items
export const getCartItems = () => {
  return API.get("/api/cart/items");
};


export const updateCartItemQuantity = (productId, quantity) => {
    return API.put("/api/cart/update", {
        productId,
        quantity
    });
};


// DELETE CART ITEM
export const deleteCartItem = (productId) => {
  return API.delete("/api/cart/delete", {
    data: {
      productId
    }
  });
};