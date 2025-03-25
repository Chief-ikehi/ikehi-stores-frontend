'use client'

import { useEffect, useState } from 'react'
import API from '@/lib/api'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import toast from 'react-hot-toast'

type CartItem = {
  id: number
  product: number
  product_name: string
  price: string
  quantity: number
  image: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const fetchCart = async () => {
    try {
      const res = await API.get('/cart/')
      setCart(res.data)
    } catch (err) {
      setError('Could not load cart. Are you logged in?')
    } finally {
      setLoading(false)
    }
  }

    const handleClearCart = async () => {
      const confirmClear = confirm("Are you sure you want to clear your cart?")
      if (!confirmClear) return

      try {
        await API.delete('/cart/clear/')
        setCart([]) // Reset cart state
        toast.success('Cart cleared!')
      } catch {
        toast.error('Failed to clear cart.')
      }
    }
  const getTotal = () =>
    cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0).toFixed(2)

  const handleCheckout = async () => {
    try {
      await API.post('/orders/')
      toast.success('Order placed successfully!')
      router.push('/orders/history')
    } catch {
      toast.error('Failed to place order.')
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
      <main className="h-screen bg-gray-50">
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {cart.length === 0 && !loading ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                <Image
                  src={item.image}
                  alt={item.product_name}
                  width={80}
                  height={80}
                  className="rounded object-cover w-20 h-20"
                />
              <div className="flex-1">
                <h2 className="font-bold">{item.product_name}</h2>
                <p>₦{item.price} × {item.quantity}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
              <p className="text-lg font-semibold">Total: ₦{getTotal()}</p>
              <div className="flex gap-4">
                <button
                  onClick={handleClearCart}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                >
                  Checkout
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
    </main>
  )
}