'use client'

import { Truck, Shield, CreditCard, RefreshCcw } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface Feature {
	icon: React.ElementType
	title: string
	description: string
}

const features = [
	{
		icon: Truck,
		title: 'Free Shipping',
		description: 'Free shipping on all orders over $100',
	},
	{
		icon: Shield,
		title: 'Secure Payments',
		description: 'We use SSL / Secure certificate',
	},
	{
		icon: CreditCard,
		title: 'Easy Payments',
		description: 'All major credit cards accepted',
	},
	{
		icon: RefreshCcw,
		title: 'Free Returns',
		description: '30-day return policy for all items',
	},
]

export function StoreFeatures() {
	return (
		<section className='w-full py-12 bg-dark-800 relative overflow-hidden'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl font-bold text-center text-gray-100 mb-8'>
					Why Choose Us
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
					{features.map((feature, index) => (
						<FeatureCard key={index} feature={feature} />
					))}
				</div>
			</div>
		</section>
	)
}

function FeatureCard({ feature }: { feature: Feature }) {
	const cardRef = useRef<HTMLDivElement>(null)
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		setMousePos({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		})
	}

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			className='group relative bg-dark-700 p-6 rounded-xl overflow-hidden transition-all duration-300'
		>
			{/* Градиентный оверлей */}
			<div
				className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
				style={{
					background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 70%)`,
				}}
			/>

			{/* Тень и масштабирование */}
			<div
				className='relative z-10 transition-transform duration-300 
        group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
			>
				<feature.icon className='w-12 h-12 text-gray-100 mb-4' />
				<h3 className='text-xl font-semibold text-gray-100 mb-2'>
					{feature.title}
				</h3>
				<p className='text-gray-400'>{feature.description}</p>
			</div>
		</div>
	)
}
