import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import LoanCalculatorWrapper from '@/components/LoanCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Loan Calculator — Monthly Payment & Total Cost',
  description: 'Calculate monthly payments and total cost for any personal loan. Free loan calculator with amortization schedule. Instant results, no signup required.',
  alternates: { canonical: 'https://loancalculators.app/loan' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How is a loan monthly payment calculated?', a: 'A personal loan monthly payment is calculated using the standard PMT (payment) formula. It depends on the loan amount (principal), the interest rate, and the loan term in months. Our loan calculator uses the exact formula: payment = principal × monthly rate × (1 + monthly rate)^n / ((1 + monthly rate)^n - 1).' },
  { q: 'What is the difference between APR and interest rate?', a: 'The interest rate is the annual cost of borrowing expressed as a percentage. APR (Annual Percentage Rate) includes the interest rate plus additional fees like origination fees, giving you the true total cost of the loan. When comparing loan offers, always compare APRs rather than just interest rates.' },
  { q: 'How do I compare two different loan offers?', a: 'To compare loan offers, look at the APR (which includes fees), the monthly payment, and total interest paid over the loan life. A lower interest rate does not always mean a lower total cost if one loan has higher fees or a longer term. Use this loan calculator to model each offer side by side.' },
  { q: 'What happens if I pay extra on my loan?', a: 'Making extra payments on a personal loan reduces your principal balance faster, which means you pay less total interest and pay off the loan sooner. Even small additional monthly payments can save hundreds or thousands in interest over the loan term.' },
  { q: 'How does loan term length affect total cost?', a: 'A shorter loan term means higher monthly payments but significantly less total interest paid. A longer term reduces your monthly payment but costs much more in interest overall. Use this calculator to compare the total cost of a 2-year vs 5-year loan at the same interest rate.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Personal Loan Calculator',
  url: 'https://loancalculators.app/loan', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate a Personal Loan Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter loan amount and interest rate', text: 'Enter the amount you want to borrow and the annual interest rate offered by your lender.' },
    { '@type': 'HowToStep', name: 'Choose your loan term', text: 'Select how many years you want to repay the loan. Shorter terms mean higher payments but less total interest.' },
    { '@type': 'HowToStep', name: 'View payment breakdown and amortization', text: 'See your monthly payment, total interest, effective APR, and full amortization schedule instantly.' },
  ],
}

export default function LoanPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Loan Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your monthly loan payment and total cost for any personal loan. Instant results with full amortization schedule.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111112" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <LoanCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222223" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Understanding your personal loan payment</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              Personal loan payments depend on three factors: the loan amount (principal), the annual interest rate, and the loan term. This loan calculator uses the standard amortization formula to give you exact monthly payments for fixed-rate loans. Include any origination fee to see the true effective APR and compare offers from multiple lenders accurately. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333334" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
