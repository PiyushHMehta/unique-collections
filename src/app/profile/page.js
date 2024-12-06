'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import UserTabs from "@/components/layout/UserTabs"
import UserForm from "@/components/layout/UserForm"

export default function ProfilePage() {
    const session = useSession()
    const { status } = session
    const [user, setUser] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false)

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/profile')
                .then(res => {
                    res.json().then(data => {
                        setUser(data)
                        setIsAdmin(data.admin),
                            setProfileFetched(true)
                    })
                })
        }
    }, [status])

    if (status === 'loading' || !profileFetched) {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    const userImage = user?.image

    async function handleProfileUpdate(ev, data) {
        ev.preventDefault()

        const savingPromise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            if (res.ok) {
                resolve()
            } else {
                reject()
            }
        })

        await toast.promise(savingPromise, {
            loading: 'Saving...',
            success: 'Profile Saved',
            error: 'Failed to Save'
        })
    }

    return (
        <section className="mt-8">
            <UserTabs isAdmin={isAdmin} />
            <div className="max-w-2xl mx-auto mt-12">
                <UserForm user={user} onSave={handleProfileUpdate} />
            </div>
        </section>
    )
}