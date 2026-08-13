import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProductGallery from "../components/ProductDetail/ProductGallery";
import ProductInfo from "../components/ProductDetail/ProductInfo";
import ProductDescription from "../components/ProductDetail/ProductDescription";
import ProductReviews from "../components/Reviews/ProductReviews";
import SimilarProducts from "../components/ProductDetail/SimilarProducts";


function ProductDetailPage() {
    const [username, setUsername] = useState("");

    const { productId } = useParams();

    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [productId]);


    useEffect(() => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
        }, [productId]);

        
    const fetchProduct = async () => {
        try {
            const res = await getProductById(productId);
            setProduct(res.data);
            setUsername(res.data.user.name);
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
        <Header />


        <div className="mx-auto max-w-7xl px-8 py-10">

            {/* Breadcrumb */}

            <p className="mb-8 text-sm text-gray-500">
                Home / Products / {product.name}
            </p>

            {/* Main Layout */}

            <div className="grid grid-cols-2 gap-16">

                <ProductGallery product={product} />

                <ProductInfo product={product}
                username={username} />

            </div>
                <ProductDescription product={product}/>
                <ProductReviews product={product} />
                <SimilarProducts productId={product.product_id}
                    onAddToCart={() => {}}/>
 
            </div>  

        <Footer />

    </div>
    );
}

export default ProductDetailPage;

