import React from 'react'

export default function SectionTitle({title, subtitle}: {title: string, subtitle?: string}) {
  return (
    <div className='section-title mb-15'>
        <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 ps-9 mb-5 relative beofre:content-[""] before:absolute before:top-1/2 before:start-0 before:-translate-y-5 before:w-5 before:h-10 before:bg-red-500 before:rounded-sm'>{title}</h2>
        <span className='text-4xl font-semibold'> {subtitle}</span>
    </div>
  )
}
