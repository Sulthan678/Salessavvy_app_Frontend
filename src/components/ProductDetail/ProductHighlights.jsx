import { Check } from "lucide-react";

const categoryHighlights = {
    Shirts: [
        "Premium Cotton",
        "Breathable Fabric",
        "Regular Fit",
        "Machine Washable",
        "Soft Finish",
        "Lightweight"
    ],

    Pants: [
        "Stretchable Fabric",
        "Slim Fit",
        "Fade Resistant",
        "Durable Stitching",
        "Comfortable Wear",
        "Machine Washable"
    ],

    Mobiles: [
        "AMOLED Display",
        "Fast Charging",
        "Long Battery Life",
        "Dual Camera",
        "Fingerprint Security",
        "1-Year Warranty"
    ],

    Accessories: [
        "Premium Build",
        "Lightweight",
        "Durable",
        "Easy to Carry",
        "High Performance",
        "Modern Design"
    ],

    "Mobile Accessories": [
        "Universal Compatibility",
        "Premium Build Quality",
        "Lightweight Design",
        "Fast & Reliable Performance",
        "Durable Material",
        "1-Year Warranty"
    ]
};

function ProductHighlights({ category }) {

    const highlights = categoryHighlights[category] || [];

    return (
        <div className="mt-8">

            <h3 className="text-xl font-bold text-gray-900 mb-5">
                Why You'll Love It
            </h3>

            <div className="flex flex-wrap gap-3">

                {highlights.map((item, index) => (

                    <div
                        key={index}
                        className="
                            flex items-center gap-2
                            rounded-full
                            border border-gray-200
                            bg-white
                            px-4 py-2
                            text-sm
                            font-medium
                            text-gray-700
                            shadow-sm
                            transition-all
                            duration-200
                            hover:border-indigo-500
                            hover:bg-indigo-50
                            hover:-translate-y-0.5  ">
                        <Check size={16} className="text-indigo-600" />

                        {item}

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ProductHighlights;