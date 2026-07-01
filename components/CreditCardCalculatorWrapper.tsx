'use client'

import dynamic from 'next/dynamic'

const CreditCardCalculator = dynamic(() => import('./CreditCardCalculator'), { ssr: false })

export default function CreditCardCalculatorWrapper() {
  return <CreditCardCalculator />
}
