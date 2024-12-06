'use client'

import UserForm from "@/components/layout/UserForm";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserPage() {
    const { loading, data } = useProfile()
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/api/profile?_id=' + id)
            .then(res => res.json())
            .then(user => { setUser(user) })
            .catch(error => console.error('Error fetching users:', error));
    }, [id]);

    async function handleEditUser(ev, data) {
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id }),
            });
            if (res.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved',
            error: 'An error has occurred while saving the user',
        });
    }

    if (loading) {
        return 'Loading...'
    }

    if (!data.admin) {
        return 'Not an admin'
    }
    return (
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true} />
            <div className="mt-8">
                <UserForm user={user} onSave={handleEditUser} />
            </div>
        </section>
    )
}