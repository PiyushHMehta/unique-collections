'use client'

import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu() {
    const [bestSellers, setBestSellers] = useState([])

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(data => {
                setBestSellers(data.slice(-3))
            })
        })
    }, [])


    return (
        <section className="">
            <div className="text-center mb-4">
                <SectionHeaders subHeader={'Check Out'} mainHeader={'Our Best Sellers'} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    bestSellers && bestSellers.length > 0 && bestSellers.map(menuItem => (
                        <MenuItem key={menuItem._id} image={menuItem.image} name={menuItem.name}
                            description={menuItem.description} basePrice={menuItem.basePrice} />
                    ))
                }
            </div>
        </section>
    )
}