import AddToCartButton from "@/components/menu/AddToCartButton"
import Image from "next/image"

export default function MenuItemTile({ onAddToCart, ...item }) {
    const { image, name, description, basePrice, sizes, colors } = item

    const hasOptions = sizes?.length > 0 || colors?.length > 0

    return (
        <div className="bg-gray-200 hover:bg-gray-100 hover:shadow-2xl 
                hover:shadow-black/25 hover:cursor-pointer p-4 rounded-lg text-center transition-all">
            <div className="text-center">
                <Image
                    src={image}
                    alt="Shirt"
                    layout="intrinsic"
                    width={400} // Set appropriate width
                    height={400} // Set appropriate height
                />
            </div>
            <h4 className="font-semibold my-2 text-xl line-clamp-3">{name}</h4>
            <p className="text-sm text-gray-500">
                {description}
            </p>
            <AddToCartButton image={image} basePrice={basePrice}
                hasOptions={hasOptions} onAddToCart={onAddToCart} />
        </div>
    )
}