'use client'

import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);

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

    // Filter categories to include only those with menu items
    const categoriesWithItems = categories.filter(category =>
        menuItems.some(item => item.category === category._id)
    );

    return (
        <section className="mt-8">
            {categoriesWithItems.map(c => (
                <div key={c._id}>
                    <div className="text-center">
                        <SectionHeaders mainHeader={c.name} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mb-12">
                        {menuItems.filter(m => m.category === c._id).map(item => (
                            <MenuItem
                                key={item._id}
                                name={item.name}
                                image={item.image}
                                description={item.description}
                                basePrice={item.basePrice}
                                sizes={item.sizes}
                                toppings={item.toppings}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}
