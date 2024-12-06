'use client'

import Image from "next/image"
// import { useState } from "react"
import { signIn } from 'next-auth/react'

export default function LoginPage() {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [loginInProgress, setLoginInProgress] = useState(false)

    // async function handleFormSubmit(ev) {
    //     ev.preventDefault()
    //     setLoginInProgress(true)
    //     await signIn('credentials', { email, password, callbackUrl: '/' })
    //     setLoginInProgress(false)
    // }


    return (
        <section className="mt-8 h-full">
            <h1 className="text-center text-primary text-4xl mb-8">
                Login
            </h1>
            {/* <form onSubmit={handleFormSubmit}
                className="block max-w-sm mx-auto">
                <input type="email" placeholder="Email" disabled={loginInProgress}
                    value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="Password" disabled={loginInProgress}
                    value={password} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" disabled={loginInProgress}>Login</button>
                <div className="my-4 text-center text-gray-500">or Login with provider</div>
                
            </form> */}
            <button type="button" onClick={() => signIn('google', {
                    callbackUrl: '/'
                })}
                    className="mx-auto flex items-center gap-4 justify-center w-80">
                    <Image src="/google-icon.png" alt="" width={32} height={32} />
                    Login w/ Google
                </button>
        </section>
    )
}