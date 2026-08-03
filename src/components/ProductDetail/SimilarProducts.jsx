import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSimilarProducts } from "../../services/productService";
import ProductCard from "../Product/ProductCard";

function SimilarProducts({ productId, onAddToCart }) {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchSimilarProducts();
    }, [productId]);

    const fetchSimilarProducts = async () => {

        try {

            const res = await getSimilarProducts(productId);
                console.log(res.data);

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
                        showAddToCart={false}
                        
                        onClick={() => navigate(`/product/${product.product_id}`)}

                    />

                ))}

            </div>

        </div>

    );

}

export default SimilarProducts;