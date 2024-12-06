import AddToCartButton from "@/components/menu/AddToCartButton"
import Image from "next/image"

export default function MenuItemTile({ onAddToCart, ...item }) {
    const { image, name, description, basePrice, sizes, toppings } = item

    const hasOptions = sizes?.length > 0 || toppings?.length > 0

    return (
        <div className="bg-gray-200 hover:bg-gray-100 hover:shadow-2xl 
                hover:shadow-black/25 hover:cursor-pointer p-4 rounded-lg text-center transition-all">
            <div className="text-center">
                <Image
                    src={image}
                    alt="Pizza"
                    className="h-36 block mx-auto"
                    width={500} // Set appropriate width
                    height={300} // Set appropriate height
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