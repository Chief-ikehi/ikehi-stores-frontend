'use client'

import React from 'react'
import Image from 'next/image'

type Product = {
  id: number
  name: string
  price: string
  stock: number
  image: string
}

type Props = {
  product: Product
  onAddToCart: (id: number) => void
}

const ProductCard = ({ product, onAddToCart }: Props) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={160} // roughly h-40 (10rem)
          className="w-full h-40 object-cover mb-2 rounded"
        />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">₦{product.price}</p>
      <p className="text-sm text-gray-500 mb-2">Stock: {product.stock}</p>
      <button
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        onClick={() => onAddToCart(product.id)}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard