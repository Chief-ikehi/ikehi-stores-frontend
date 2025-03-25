'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import API from '@/lib/api'
import ProductCard from '@/components/ProductCard'
import toast from 'react-hot-toast'

type Product = {
  id: number
  name: string
  price: string
  stock: number
  image: string
}

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products/')
        setFeatured(res.data.slice(0, 4)) // get first 4
      } catch (err) {
        console.error('Failed to fetch featured products')
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = async (id: number) => {
    try {
      await API.post('/cart/add/', { product_id: id, quantity: 1 })
      toast.success('Added to cart!')
    } catch {
      toast.error('You must be logged in to add to cart.')
    }
  }

  return (
    <main className="bg-gradient-to-br from-blue-50 to-white min-h-screen px-6 py-12 space-y-24">

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Welcome to <span className="text-blue-600">Ikehi Stores</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6 md:mb-8">
            Your one-stop destination for quality, convenience, and unbeatable prices.
            Shop everything you love, all in one place.
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded shadow hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            Start Shopping →
          </Link>
        </div>

        <div className="hidden md:block relative">
          <div className="absolute -inset-2 bg-blue-100 blur-2xl opacity-30 rounded-lg animate-pulse"></div>
          <Image
            src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
            alt="eCommerce shopping illustration"
            width={500}
            height={500}
            className="w-full h-auto"
            />
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
          >
            View All Products
          </Link>
        </div>
      </section>
    </main>
  )
}