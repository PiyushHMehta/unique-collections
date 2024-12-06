'use client'

import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const categoryContainerRef = useRef(null); // Reference for horizontal scroll container

    useEffect(() => {
        async function fetchData() {
            try {
                const [categoriesRes, menuItemsRes] = await Promise.all([
                    fetch('/api/categories'),
                    fetch('/api/menu-items')
                ]);
                const [categoriesData, menuItemsData] = await Promise.all([
                    categoriesRes.json(),
                    menuItemsRes.json()
                ]);

                setCategories(categoriesData);
                setMenuItems(menuItemsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    // Filter menu items based on the selected category
    const filteredMenuItems =
        selectedCategory === "all"
            ? menuItems
            : menuItems.filter(item => item.category === selectedCategory);

    // Group items by category
    const groupedItems = categories.map(category => ({
        category,
        items: filteredMenuItems.filter(item => item.category === category._id),
    }));

    // Handle horizontal scrolling
    const scrollCategories = (direction) => {
        const container = categoryContainerRef.current;
        const scrollAmount = 200; // Adjust the scroll distance
        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="mt-8">
            {/* Sticky Category Filters */}
            <div className="sticky top-0 z-10 bg-white shadow-md rounded-md py-2 px-6">
                <div className="relative flex items-center">
                    {/* Left Scroll Icon */}
                    <button
                        className="w-8 absolute left-0 px-2 py-2 bg-gray-100 rounded-full shadow-md z-20"
                        onClick={() => scrollCategories("left")}
                    >
                        <FaChevronLeft className="text-gray-600" size={16} />
                    </button>
                    {/* Categories Container */}
                    <div
                        ref={categoryContainerRef}
                        className="flex overflow-x-scroll hide-scrollbar gap-4 mx-4 px-8 py-2"
                    >
                        <div
                            className={`whitespace-nowrap px-4 py-2 cursor-pointer rounded-md ${
                                selectedCategory === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                            onClick={() => setSelectedCategory("all")}
                        >
                            All
                        </div>
                        {categories.map(category => (
                            <div
                                key={category._id}
                                className={`whitespace-nowrap px-4 py-2 cursor-pointer rounded-md ${
                                    selectedCategory === category._id ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                                onClick={() => setSelectedCategory(category._id)}
                            >
                                {category.name}
                            </div>
                        ))}
                    </div>
                    {/* Right Scroll Icon */}
                    <button
                        className="w-8 absolute right-0 px-2 py-2 bg-gray-100 rounded-full shadow-md z-20"
                        onClick={() => scrollCategories("right")}
                    >
                        <FaChevronRight className="text-gray-600" size={16} />
                    </button>
                </div>
            </div>

            {/* Menu Items with Categories */}
            <div className="grid grid-cols-1 gap-8 mt-8">
                {groupedItems.map(({ category, items }) => {
                    // Show empty stock message if category has no items
                    if (selectedCategory === category._id && items.length === 0) {
                        return (
                            <div key={category._id} className="text-center">
                                <SectionHeaders mainHeader={category.name} />
                                <p className="text-gray-500 mt-4">Empty Stock</p>
                            </div>
                        );
                    }

                    // Show all categories and items when "All" is selected or specific categories when filtered
                    if (selectedCategory === "all" || items.length > 0) {
                        return (
                            <div key={category._id}>
                                <div className="text-center mt-4">
                                    <SectionHeaders mainHeader={category.name} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                                    {items.map(item => (
                                        <MenuItem
                                            key={item._id}
                                            name={item.name}
                                            image={item.image}
                                            description={item.description}
                                            basePrice={item.basePrice}
                                            sizes={item.sizes}
                                            colors={item.colors}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    return null;
                })}
            </div>
        </section>
    );
}
