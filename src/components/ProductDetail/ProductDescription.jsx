function ProductDescription({ product }) {

    const specifications = {

        Shirts: [
            { label: "Material", value: "Premium Cotton" },
            { label: "Fit", value: "Regular Fit" },
            { label: "Sleeve", value: "Full Sleeve" },
            { label: "Pattern", value: "Solid" },
            { label: "Wash Care", value: "Machine Wash" },
            { label: "Country", value: "India" }
        ],

        Pants: [
            { label: "Material", value: "Denim" },
            { label: "Fit", value: "Slim Fit" },
            { label: "Stretch", value: "Yes" },
            { label: "Wash Care", value: "Machine Wash" },
            { label: "Country", value: "India" }
        ],

        Mobiles: [
            { label: "Display", value: "AMOLED" },
            { label: "Battery", value: "5000 mAh" },
            { label: "Processor", value: "Octa-Core" },
            { label: "Charging", value: "Fast Charging" },
            { label: "Warranty", value: "1 Year" }
        ],
        
        Accessories: [
            { label: "Material", value: "Premium Quality" },
            { label: "Weight", value: "Lightweight" },
            { label: "Warranty", value: "6 Months" },
            { label: "Country", value: "India" }
        ],
        
        "Mobile Accessories": [
            { label: "Compatibility", value: "Universal" },
            { label: "Material", value: "Premium Quality" },
            { label: "Warranty", value: "1 Year" },
            { label: "Weight", value: "Lightweight" },
            { label: "Colour", value: "Black" }
        ]


    };

    const specs = specifications[product.category] || [];

    return (

        <div className="mt-16 rounded-3xl border border-gray-200 bg-white p-8">

            <h2 className="mb-8 text-3xl font-bold">
                Description & Specifications
            </h2>

            {/* Description */}

            <div className="mb-10">

                <h3 className="mb-4 text-xl font-semibold">
                    Description
                </h3>

                <p className="leading-8 text-gray-600">
                    {product.description}
                </p>

            </div>

            {/* Specifications */}

            <div>

                <h3 className="mb-6 text-xl font-semibold">
                    Specifications
                </h3>

                <div className="divide-y divide-gray-100">

                    {specs.map((spec, index) => (

                        <div
                            key={index}
                            className="grid grid-cols-2 py-4"
                        >

                            <span className="font-medium text-gray-500">
                                {spec.label}
                            </span>

                            <span className="font-semibold text-gray-900">
                                {spec.value}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default ProductDescription;