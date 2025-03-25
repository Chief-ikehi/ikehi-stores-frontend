'use client'

import { useEffect, useState } from 'react'
import API from '@/lib/api'

type OrderItem = {
  product: number
  quantity: number
  price: string
}

type Order = {
  id: number
  created_at: string
  total: string
  items: OrderItem[]
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders/my-orders/')
        setOrders(res.data)
      } catch (err) {
        setError('Could not load orders.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
      <main className="h-screen bg-gray-50">
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {orders.length === 0 && !loading ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold">Order #{order.id}</h2>
            <p className="text-sm text-gray-500">Placed on: {new Date(order.created_at).toLocaleString()}</p>
            <ul className="mt-2 space-y-1">
              {order.items.map((item, idx) => (
                <li key={idx} className="text-sm">
                  {item.quantity} × Product #{item.product} @ ₦{item.price}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total: ₦{order.total}</p>
          </div>
        ))
      )}
    </div>
    </main>
  )
}