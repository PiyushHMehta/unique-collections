'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function UserTabs({ isAdmin }) {
    const path = usePathname()

    return (
        <div className="flex justify-center items-center gap-2 tabs flex-wrap">
            <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}>Profile</Link>
            {
                !isAdmin && (
                    <Link className={/my-orders/.test(path) ? 'active' : ''}
                        href={'/my-orders'}>My Orders</Link>
                )
            }
            {
                isAdmin && (
                    <>
                        <Link className={path === '/categories' ? 'active' : ''}
                            href={'/categories'}>Categories</Link>
                        <Link className={/menu-items/.test(path) ? 'active' : ''}
                            href={'/menu-items'}>Menu Items</Link>
                        <Link className={/users/.test(path) ? 'active' : ''}
                            href={'/users'}>Users</Link>
                        <Link className={/orders/.test(path) ? 'active' : ''}
                            href={'/orders'}>Orders</Link>
                    </>
                )
            }
        </div>
    )
}