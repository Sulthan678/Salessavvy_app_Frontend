import { useEffect, useState } from "react";
import { getSimilarProducts } from "../../services/productService";
import ProductCard from "../Product/ProductCard";

function SimilarProducts({ productId, onAddToCart }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchSimilarProducts();
    }, [productId]);

    const fetchSimilarProducts = async () => {

        try {

            const res = await getSimilarProducts(productId);

            setProducts(res.data);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="mt-16">

            <h2 className="text-3xl font-bold mb-8">

                You May Also Like

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {products.map(product => (

                    <ProductCard
                        key={product.product_id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />

                ))}

            </div>

        </div>

    );

}

export default SimilarProducts;