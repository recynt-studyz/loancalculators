import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import AutoLoanCalculatorWrapper from '@/components/AutoLoanCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Auto Loan Calculator — Car Payment Calculator',
  description: 'Calculate your monthly car payment, total cost and interest for any auto loan. Free car payment calculator with trade-in value and sales tax. Instant results.',
  alternates: { canonical: 'https://loancalculators.app/auto-loan' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'What is a good interest rate for a car loan?', a: 'As of 2026, average new car loan rates are around 7%–9% for buyers with good credit (700+ score). Used car loans typically run 1–2 percentage points higher. Credit unions often offer rates 1–2% lower than banks. A rate below 6% for a new car is generally excellent.' },
  { q: 'How does a trade-in affect my auto loan?', a: 'A trade-in reduces the amount you need to finance. If your car is worth $8,000 as a trade-in, that $8,000 is subtracted from the vehicle price before calculating your loan. This reduces your monthly payment and total interest paid. Our auto loan calculator lets you enter your trade-in value separately.' },
  { q: 'Should I put more money down on a car?', a: 'A larger down payment reduces the amount financed, lowering your monthly payment and total interest paid. It also helps avoid being "underwater" on the loan (owing more than the car is worth), which is important since cars depreciate quickly. Aim for at least 10–20% down on a new car.' },
  { q: 'What is a good monthly car payment?', a: 'Financial advisors often recommend keeping total car expenses (payment + insurance + gas + maintenance) under 15–20% of your take-home pay. For most people, this means a car payment of $300–$600/month. Our calculator helps you find the loan amount that fits your budget.' },
  { q: 'How long should my auto loan term be?', a: 'Shorter loan terms (36–48 months) cost less in total interest but have higher monthly payments. Longer terms (60–84 months) lower your monthly payment but you pay more interest overall and risk being underwater on a depreciating asset. Most financial experts recommend keeping auto loans to 60 months or less.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Auto Loan Calculator',
  url: 'https://loancalculators.app/auto-loan', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Car Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter vehicle price, down payment, and trade-in', text: 'Enter the vehicle price, your down payment, any trade-in value, and your state sales tax rate.' },
    { '@type': 'HowToStep', name: 'Enter your interest rate and loan term', text: 'Enter the APR from your lender and choose your loan term in months (24–84 months).' },
    { '@type': 'HowToStep', name: 'See your monthly car payment and total cost', text: 'View your monthly payment, total interest, and how your rate compares to the national average.' },
  ],
}

export default function AutoLoanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobglc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Auto Loan Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your monthly car payment with trade-in value, sales tax, and true loan cost. Instant results.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111113" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <AutoLoanCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222224" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Calculate your true car payment</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This auto loan calculator includes all the factors that affect your real car payment: vehicle price, down payment, trade-in value, state sales tax, interest rate, and loan term. Many buyers forget that sales tax is added to the financed amount, increasing the loan balance. Enter your state&apos;s sales tax rate or the exact rate from your dealer to see your true monthly car payment. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333335" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
