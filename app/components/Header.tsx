'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import ButtonUploadFile from './ButtonUploadFile'
import Logo from './Logo'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-white">
      <div className="container flex items-center justify-between  mx-auto p-5 ">
        {/** Logo */}
        <Logo />

        {/** Action or buttons */}
        <div className="flex gap-3">
          <ul className="flex items-center gap-2">
            {status === 'authenticated' ? (
              <>
                <li>
                  <ButtonUploadFile />
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="button button--default"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                {[
                  {
                    label: 'Login',
                    href: '/login',
                  },
                  {
                    label: 'Signup',
                    href: '/signup',
                  },
                ].map((item, i) => (
                  <li key={i}>
                    <Link href={item.href} className="button button--default">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}