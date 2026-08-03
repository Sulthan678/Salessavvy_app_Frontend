import { Star, BadgeCheck } from "lucide-react";
import { useRef, useEffect } from "react";

function ProductReviews({ product }) {

    const reviewsData = {

        Shirts: {
            averageRating: 4.8,
            totalReviews: 128,
            reviews: [
                {
                    id: 1,
                    user: "Rahul M.",
                    rating: 5,
                    verified: true,
                    date: "2 days ago",
                    comment: "Excellent quality. The fabric feels premium and fits perfectly."
                },
                {
                    id: 2,
                    user: "Anjali P.",
                    rating: 4,
                    verified: true,
                    date: "1 week ago",
                    comment: "Looks exactly like the pictures. Delivery was quick."
                },
                {
                    id: 3,
                    user: "Arun K.",
                    rating: 5,
                    verified: false,
                    date: "3 weeks ago",
                    comment: "Definitely worth the money."
                }
            ]
        },

        Pants: {
            averageRating: 4.7,
            totalReviews: 96,
            reviews: [
                {
                    id: 1,
                    user: "Karthik S.",
                    rating: 5,
                    verified: true,
                    date: "5 days ago",
                    comment: "Battery life is excellent and the display is crisp."
                },
                {
                    id: 2,
                    user: "Meera P.",
                    rating: 4,
                    verified: true,
                    date: "2 weeks ago",
                    comment: "Camera quality is great for the price."
                }
            ]
        },

        Mobiles: {
            averageRating: 4.9,
            totalReviews: 211,
            reviews: [
                {
                    id: 1,
                    user: "Nithin R.",
                    rating: 5,
                    verified: true,
                    date: "3 days ago",
                    comment: "Very comfortable even after wearing them all day."
                },
                {
                    id: 2,
                    user: "Deepa S.",
                    rating: 5,
                    verified: true,
                    date: "1 week ago",
                    comment: "Excellent grip and stylish design."
                }
            ]
        },

        "Mobile Accessories": {
            averageRating: 4.6,
            totalReviews: 73,
            reviews: [
                {
                    id: 1,
                    user: "Akhil B.",
                    rating: 5,
                    verified: true,
                    date: "4 days ago",
                    comment: "Looks premium and keeps accurate time."
                },
                {
                    id: 2,
                    user: "Riya M.",
                    rating: 4,
                    verified: false,
                    date: "2 weeks ago",
                    comment: "Elegant design and comfortable to wear."
                }
            ]
        },

        Accessories: {
            averageRating: 4.5,
            totalReviews: 58,
            reviews: [
                {
                    id: 1,
                    user: "Farhan A.",
                    rating: 5,
                    verified: true,
                    date: "1 week ago",
                    comment: "Good quality accessory at an affordable price."
                }
            ]
        }

    };

    console.log(product.category);

    const data = reviewsData[product.category];

    if (!data) {
        return (
            <section className="mt-20">
                <h2 className="mb-8 text-3xl font-bold">
                    Customer Reviews
                </h2>

                <p className="text-gray-500">
                    No reviews available for this category.
                </p>
            </section>
        );
    }

    return (
    <section id="customer-reviews" className="mt-24">

        <h2 className="mb-10 text-3xl font-bold text-gray-900">
            Customer Reviews
        </h2>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">

            {/* LEFT SIDE */}

            <div >
                {/* className="lg:sticky lg:top-28 lg:self-start" */}

                <div className="mb-6">

                    <h3 className="text-6xl font-bold text-gray-900">
                        {data.averageRating}
                    </h3>

                    <div className="mt-3 flex">

                        {[...Array(5)].map((_, index) => (

                            <Star
                                key={index}
                                size={24}
                                className="fill-yellow-400 text-orange-400"
                            />

                        ))}

                    </div>

                    <p className="mt-3 text-gray-500">
                        Based on {data.totalReviews} reviews
                    </p>

                </div>

                {/* Rating Bars */}

                <div className="space-y-4">

                    {[
                        { star: 5, value: 72 },
                        { star: 4, value: 18 },
                        { star: 3, value: 6 },
                        { star: 2, value: 3 },
                        { star: 1, value: 1 }
                    ].map((item) => (

                        <div
                            key={item.star}
                            className="flex items-center gap-4"
                        >

                            <span className="w-10 text-sm">
                                {item.star}★
                            </span>

                            <div className="h-2 flex-1 rounded-full bg-gray-200">

                                <div
                                    className="h-2 rounded-full bg-amber-400"
                                    style={{
                                        width: `${item.value}%`
                                    }}
                                />

                            </div>

                            <span className="w-10 text-sm text-gray-500">
                                {item.value}%
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="lg:col-span-2 divide-y divide-gray-200">

                {data.reviews.map((review) => (

                    <div
                        key={review.id}
                        className="py-8"
                    >

                        {/* Header */}

                        <div className="flex items-start justify-between">

                            <div className="flex items-center gap-4">

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-700">
                                    {review.user.charAt(0)}
                                </div>

                                <div>

                                    <h3 className="font-semibold text-gray-900">
                                        {review.user}
                                    </h3>

                                    {review.verified && (

                                        <div className="mt-1 flex items-center gap-1 text-sm text-green-600">

                                            <BadgeCheck size={16} />

                                            Verified Purchase

                                        </div>

                                    )}

                                </div>

                            </div>

                            <span className="text-xs text-gray-400">
                                {review.date}
                            </span>

                        </div>

                        {/* Stars */}

                        <div className="mt-4 mb-3 flex">

                            {[...Array(review.rating)].map((_, index) => (

                                <Star
                                    key={index}
                                    size={18}
                                    className="fill-yellow-400 text-orange-400"
                                />

                            ))}

                        </div>

                        {/* Review */}

                        <p className="leading-8 text-gray-700">
                            {review.comment}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    </section>
);
}

export default ProductReviews;