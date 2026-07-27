import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import ProductDescription from "../components/ProductDetail/ProductDescription";
import SimilarProducts from "../components/ProductDetail/SimilarProducts";


function ProductDetailPage() {

    const { productId } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [productId]);

    const fetchProduct = async () => {
        try {
            const res = await getProductById(productId);
            setProduct(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
    <div className="min-h-screen bg-gray-50">

        <div className="mx-auto max-w-7xl px-8 py-10">

            {/* Breadcrumb */}

            <p className="mb-8 text-sm text-gray-500">
                Home / Products / {product.name}
            </p>

            {/* Main Layout */}

            <div className="grid grid-cols-2 gap-16">

                <ProductGallery product={product} />

                <ProductInfo product={product} />

            </div>
            <ProductDescription product={product}/>
            <SimilarProducts productId={product.product_id}
                onAddToCart={() => {}}/>


                
            </div>  

        

    </div>
    );
}

export default ProductDetailPage;

