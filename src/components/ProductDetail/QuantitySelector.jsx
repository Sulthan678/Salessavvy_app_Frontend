import { Minus, Plus } from "lucide-react";
import { useState } from "react";

function QuantitySelector() {

    const [quantity, setQuantity] = useState(1);

    return (

        <div>

            <p className="mb-3 text-lg font-semibold">

                Quantity

            </p>

            <div className="flex w-fit items-center gap-6 rounded-2xl border border-gray-300 px-6 py-3">

                <button
                    onClick={() =>
                        quantity > 1 &&
                        setQuantity(quantity - 1)
                    }
                >

                    <Minus />

                </button>

                <span className="text-xl font-bold">

                    {quantity}

                </span>

                <button
                    onClick={() =>
                        setQuantity(quantity + 1)
                    }
                >

                    <Plus />

                </button>

            </div>

        </div>

    );

}

export default QuantitySelector;