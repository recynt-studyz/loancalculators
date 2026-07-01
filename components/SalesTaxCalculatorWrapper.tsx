'use client'

import dynamic from 'next/dynamic'

const SalesTaxCalculator = dynamic(() => import('./SalesTaxCalculator'), { ssr: false })

export default function SalesTaxCalculatorWrapper() {
  return <SalesTaxCalculator />
}
