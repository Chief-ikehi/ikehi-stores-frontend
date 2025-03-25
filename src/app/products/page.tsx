'use client'

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products/')
        setProducts(res.data)
      } catch (err: any) {
        setError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = async (productId: number) => {
    try {
      await API.post('/cart/add/', { product_id: productId, quantity: 1 })
      toast.success('Product added to cart')
    } catch (err: any) {
      toast.error('Failed to add to cart. Are you logged in?')
    }
  }

  return (
      <main className="h-screen bg-gray-50">
    <div className="p-6 text-black">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
    </main>
  )
}