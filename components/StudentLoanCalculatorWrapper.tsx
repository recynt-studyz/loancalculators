'use client'

import dynamic from 'next/dynamic'

const StudentLoanCalculator = dynamic(() => import('./StudentLoanCalculator'), { ssr: false })

export default function StudentLoanCalculatorWrapper() {
  return <StudentLoanCalculator />
}
