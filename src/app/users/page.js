'use client'

import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import Pagination from "@/components/layout/Pagination";

export default function Users() {
    const { loading, data } = useProfile();
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Show 5 users per page

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(data => {
                setUsers(data);
            });
        });
    }, []);

    // Pagination logic to slice users by currentPage
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    if (loading) {
        return 'Loading...';
    }

    if (!data.admin) {
        return 'Not an admin';
    }

    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                {currentUsers && currentUsers.length > 0 && currentUsers.map(user => (
                    <div key={user._id} className="bg-gray-200 rounded-lg mb-2 py-1 px-4 md:flex items-center">
                        <div className="flex gap-4 items-center grow">
                            <span>{user?.name || <i className="text-gray-500">No Name</i>}</span>
                            <span>{user?.email}</span>
                        </div>
                        <div>
                            <Link href={`/users/${user._id}`} className="button">Edit</Link>
                        </div>
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
