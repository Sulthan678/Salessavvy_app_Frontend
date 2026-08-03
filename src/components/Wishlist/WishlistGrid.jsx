import WishlistCard from "./WishlistCard";

function WishlistGrid({ items, onRemove }) {
    return (
        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                gap-8
            ">
                
            {items.map((item) => (
                <WishlistCard
                    key={item.product_id}
                    product={item}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
}

export default WishlistGrid;