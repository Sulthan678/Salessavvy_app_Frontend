import { useState } from "react";
import { motion } from "framer-motion";

function ProductGallery({ product }) {

    const [selectedImage, setSelectedImage] = useState(
        product.images?.[0]
    );

    return (

        <div className="flex gap-5">

            {/* Thumbnails */}

            <div className="flex flex-col gap-4">

                {product.images?.map((image, index) => (

                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`h-24 w-24 overflow-hidden rounded-2xl border-2 transition

                        ${
                            selectedImage === image
                                ? "border-indigo-600"
                                : "border-gray-200 hover:border-indigo-300"
                        }`}
                    >

                        <img
                            src={image}
                            alt=""
                            className="h-full w-full object-cover"
                        />

                    </button>

                ))}

            </div>

            {/* Main Image */}

            <div className="flex flex-1 items-center justify-center rounded-3xl bg-white p-8 shadow-sm">

                <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: .25 }}
                    whileHover={{ scale: 1.08 }}
                    src={selectedImage}
                    alt={product.name}
                    className="max-h-[550px] object-contain"
                />

            </div>

        </div>

    );

}

export default ProductGallery;