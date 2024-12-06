'use client'

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import React, { useEffect, useState } from "react";
import { cartItemsPrice } from "@/components/AppContext";
import { formatDistanceToNow } from 'date-fns';
import Left from "@/components/icons/Left";
import Right from "@/components/icons/Right";
import Pagination from "@/components/layout/Pagination";

export default function Orders() {
    const { data, loading } = useProfile();
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5; // Show 5 orders per page

    const fetchOrders = () => {
        fetch('/api/checkout')
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
    }, []);


    // Pagination logic to slice orders by currentPage
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    if (loading) {
        return 'Loading...';
    }

    if (!data.admin) {
        return 'Not an admin';
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={true} />

            <table className="w-full mt-8">
                <thead>
                    <tr className="bg-gray-400 text-white">
                        <th className="px-4 py-2">Customer Name</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">Address</th>
                        <th className="px-4 py-2">Dish Name</th>
                        <th className="px-4 py-2">Toppings</th>
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Ordered</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order, orderIndex) => {
                        const bgColor = orderIndex % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
                        return (
                            <React.Fragment key={orderIndex}>
                                {order.cartItems.map((item, itemIndex) => (
                                    <tr key={`${orderIndex}-${itemIndex}`} className={bgColor}>
                                        {itemIndex === 0 && (
                                            <>
                                                <td className="px-4 py-2" rowSpan={order.cartItems.length}>{order.userName}</td>
                                                <td className="px-4 py-2" rowSpan={order.cartItems.length}>{order.phoneNum}</td>
                                                <td className="px-4 py-2" rowSpan={order.cartItems.length}>
                                                    {order.streetAddress}, {order.city}, {order.pinCode}
                                                </td>
                                            </>
                                        )}
                                        <td className="px-4 py-2">{item.name}</td>
                                        <td className="px-4 py-2">
                                            {item.toppings.length > 0 ? item.toppings.map(topping => topping.name).join(', ') : 'None'}
                                        </td>
                                        <td className="px-4 py-2">{item.size ? item.size.name : 'Default'}</td>
                                        <td className="px-4 py-2">₹{cartItemsPrice(item).toFixed(2)}</td>
                                        {itemIndex === 0 && (
                                            <td className="px-4 py-2" rowSpan={order.cartItems.length}>
                                                {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </section>
    )
}
