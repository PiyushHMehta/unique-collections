'use client'

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import { cartItemsPrice } from "@/components/AppContext";
import Pagination from "@/components/layout/Pagination";
import UserTabs from "@/components/layout/UserTabs";

export default function UserOrders() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5; // Show 5 orders per page

    const fetchOrders = () => {
        if (!session || !session.user.email) return; // Avoid fetching if no session

        fetch('/api/my-orders')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    // Sort orders by date (newest first)
                    const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setOrders(sortedOrders);
                } else {
                    console.error('Unexpected data format:', data);
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error.message);
            });
    }

    useEffect(() => {
        fetchOrders();

        // Set up polling
        const intervalId = setInterval(fetchOrders, 30000); // Fetch every 30 seconds

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [session]);

    // Pagination logic to slice orders by currentPage
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    if (status === "loading") {
        return 'Loading...';
    }

    if (!session) {
        return 'Not authenticated';
    }

    return (
        <section className="mt-8 px-4">
            <UserTabs isAdmin={false} />

            <div className="flex flex-col space-y-4 mt-8">
                {currentOrders.map((order, orderIndex) => (
                    <div key={orderIndex} className="bg-white p-4 rounded-lg shadow-md">
                        {order.cartItems.map((item, itemIndex) => (
                            <div key={`${orderIndex}-${itemIndex}`} className="border-b border-gray-200 pb-2 mb-2">
                                <div className="flex justify-between">
                                    <div className="text-sm font-medium text-primary">Dish Name:</div>
                                    <div className="text-sm">{item.name}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-medium text-primary">Toppings:</div>
                                    <div className="text-sm">{item.toppings.length > 0 ? item.toppings.map(topping => topping.name).join(', ') : 'None'}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-medium text-primary">Size:</div>
                                    <div className="text-sm">{item.size ? item.size.name : 'Default'}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="text-sm font-medium text-primary">Price:</div>
                                    <div className="text-sm">₹{cartItemsPrice(item).toFixed(2)}</div>
                                </div>
                                {itemIndex === 0 && (
                                    <div className="flex justify-between">
                                        <div className="text-sm font-medium text-primary">Ordered:</div>
                                        <div className="text-sm">{formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </section>
    )
}
