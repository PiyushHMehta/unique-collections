import { useContext, useState } from "react"
import { CartContext } from "../AppContext"
import MenuItemTile from "@/components/menu/MenuItemTile"
import Image from "next/image"
import toast from "react-hot-toast";
// import FlyingButton from "react-flying-item"

export default function MenuItem(menuItem) {
    const { name, image, description, basePrice, sizes, toppings } = menuItem
    const { addToCart } = useContext(CartContext)
    const [showPopup, setShowPopup] = useState(false)
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null)
    const [selectedToppings, setSelectedToppings] = useState([])

    async function handleAddToCart() {
        const hasOptions = sizes?.length > 0 || toppings?.length > 0;
        if (hasOptions && !showPopup) {
            setShowPopup(true);
            return;
        }
    
        // Use toast.promise for feedback during the add-to-cart process
        const addToCartPromise = new Promise(async (resolve, reject) => {
            try {
                addToCart(menuItem, selectedSize, selectedToppings);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay for user experience
                resolve();
            } catch (error) {
                reject();
            }
        });
    
        await toast.promise(addToCartPromise, {
            loading: "Adding item to cart...",
            success: "Item added to cart successfully!",
            error: "Failed to add item to cart.",
        });
    
        setShowPopup(false);
    }

    function handleToppings(ev, topping) {
        const checked = ev.target.checked
        if (checked) {
            setSelectedToppings(prev => [...prev, topping])
        } else {
            setSelectedToppings(prev => {
                return prev.filter(e => e.name !== topping.name)
            })
        }
    }

    let selectedPrice = basePrice
    if (selectedSize) {
        selectedPrice += selectedSize.price
    }
    if (selectedToppings?.length > 0) {
        for (const topping of selectedToppings) {
            selectedPrice += topping.price
        }
    }

    return (
        <>
            {
                showPopup && (
                    <div onClick={() => setShowPopup(false)}
                        className="fixed inset-0 bg-black/75 flex items-center justify-center">
                        <div onClick={ev => ev.stopPropagation()}
                            className="bg-white p-4 max-h-screen overflow-y-scroll">
                            <Image src={image} alt="Menu item" width={300} height={300} />
                            <h2 className="text-lg font-bold text-center">{name}</h2>
                            <p className="text-center text-gray-500 text-md mt-2">{description}</p>

                            {
                                sizes && sizes.length > 0 && (
                                    <div className="p-2">
                                        <h3>Choose size</h3>
                                        {
                                            sizes.map(size => (
                                                <label key={size.name} className="flex items-center gap-2 py-1">
                                                    <input type="radio" name="size"
                                                        checked={selectedSize?.name === size.name}
                                                        onChange={() => setSelectedSize(size)}
                                                    />
                                                    {size.name}₹ {basePrice + size.price}
                                                </label>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            {
                                toppings && toppings.length > 0 && (
                                    <div className="p-2">
                                        <h3>Choose toppings</h3>
                                        {
                                            toppings.map(topping => (
                                                <label key={topping.name} className="flex items-center gap-3 py-1">
                                                    <input type="checkbox" name="topping"
                                                        onChange={ev => handleToppings(ev, topping)}
                                                    />
                                                    Extra {topping.name} ₹{topping.price}
                                                </label>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            <button
                                src={image}>
                                <div className="w-full primary text-primary sticky bottom-2 flex justify-center"
                                    onClick={handleAddToCart}>
                                    <span className="w-full flex justify-center">Add to cart ₹{selectedPrice}</span>
                                </div>
                            </button>

                            <button className="mt-4 w-full flex justify-center"
                                onClick={() => setShowPopup(false)}>Cancel</button>
                        </div>
                    </div>
                )
            }
            <MenuItemTile onAddToCart={handleAddToCart} {...menuItem} />
        </>
    )
}