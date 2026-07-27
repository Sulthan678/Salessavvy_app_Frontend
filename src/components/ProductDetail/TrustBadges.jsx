import {
    TruckElectric,
    RefreshCw,
    BadgeDollarSign,
    Award
} from "lucide-react";

function TrustBadges() {

    const badges = [

        {
            icon: BadgeDollarSign,
            title: "Pay on Delivery"
        },

        {
            icon: RefreshCw,
            title: "7-Day Return"
        },

        {
            icon: TruckElectric,
            title: "Free Delivery"
        },

        {
            icon: Award,
            title: "Top Brand"
        }

    ];

    return (

        <div className="mt-8 border-y border-gray-200 py-6">

            <div className="grid grid-cols-4 gap-6">

                {badges.map((badge, index) => {

                    const Icon = badge.icon;

                    return (

                        <div
                            key={index}
                            className="flex flex-col items-center text-center group cursor-pointer"
                        >

                            {/* Icon */}

                            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-300 bg-gray-50 transition-all duration-300 group-hover:border-indigo-500 group-hover:bg-indigo-50">

                                <Icon
                                    size={26}
                                    className="text-gray-600 group-hover:text-indigo-600"
                                />

                            </div>

                            {/* Title */}

                            <p className="mt-3 text-sm font-medium text-blue-700 leading-5">

                                {badge.title}

                            </p>

                        </div>

                    );

                })}

            </div>

        </div>

    );

}

export default TrustBadges;