import { PackageSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EmptyOrders() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center rounded-3xl bg-white py-24 shadow-sm">

      {/* Icon */}

      <div className="mb-6 rounded-full bg-[#F5F7FB] p-8">

        <PackageSearch
          size={70}
          className="text-indigo-600"
        />

      </div>

      {/* Heading */}

      <h2 className="text-3xl font-bold text-gray-900">
        No Orders Yet
      </h2>

      {/* Description */}

      <p className="mt-3 max-w-md text-center text-gray-500">
        Looks like you haven't placed any orders yet.
        Start shopping and your orders will appear here.
      </p>

      {/* Button */}

      <button
        onClick={() => navigate("/customerhome")}
        className="mt-8 rounded-2xl bg-indigo-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
      >
        Continue Shopping
      </button>

    </div>
  );
}

export default EmptyOrders;