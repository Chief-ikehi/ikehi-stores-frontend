'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-gray-800 text-white px-6 py-3">
      <div className="flex justify-between items-center">
        {/* Brand + Desktop Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">Ikehi Store</Link>

          <div className="hidden md:flex gap-4">
            <Link href="/products" className="hover:underline">Products</Link>
            <Link href="/cart" className="hover:underline">Cart</Link>
            <Link href="/orders/history" className="hover:underline">Orders</Link>
          </div>
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex gap-4 items-center">
          {!isAuthenticated && (
            <>
              <Link href="/auth/login" className="hover:underline">Login</Link>
              <Link href="/auth/register" className="hover:underline">Register</Link>
            </>
          )}
          {isAuthenticated && (
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 border-t border-gray-700 pt-4">
          <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)}>Cart</Link>
          <Link href="/orders/history" onClick={() => setIsOpen(false)}>Orders</Link>

          {!isAuthenticated && (
            <>
              <Link href="/auth/login" onClick={() => setIsOpen(false)}>Login</Link>
              <Link href="/auth/register" onClick={() => setIsOpen(false)}>Register</Link>
            </>
          )}

          {isAuthenticated && (
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="text-left bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}