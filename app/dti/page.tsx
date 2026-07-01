import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import DTICalculatorWrapper from '@/components/DTICalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'DTI Calculator — Debt-to-Income Ratio Calculator',
  description: 'Calculate your debt-to-income ratio for mortgage and loan qualification. Free DTI calculator with front-end and back-end ratio breakdown.',
  alternates: { canonical: 'https://loancalculators.app/dti' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'What is a good debt-to-income ratio?', a: 'A DTI ratio under 36% is generally considered excellent by lenders. 36%–43% is acceptable and most conventional mortgage lenders will approve loans in this range. 43%–50% is considered high risk. Above 50% makes it very difficult to qualify for most loans. Our DTI calculator shows your front-end and back-end ratios with a clear status indicator.' },
  { q: 'How do lenders calculate DTI?', a: 'Lenders calculate DTI by dividing your total monthly debt payments by your gross monthly income (before taxes). They use two versions: Front-end DTI (housing costs only ÷ income) and Back-end DTI (all debt payments ÷ income). Most lenders focus on the back-end DTI and require it to be under 43% for conventional loans.' },
  { q: 'What is front-end vs back-end DTI?', a: 'Front-end DTI includes only housing costs (mortgage/rent, property taxes, insurance, HOA, PMI) divided by gross monthly income. Lenders want this under 28%. Back-end DTI includes ALL monthly debt payments (housing + car loans + student loans + credit card minimums + other debts) divided by gross income. Lenders want this under 36%–43%.' },
  { q: 'Can I get a mortgage with high DTI?', a: 'It becomes harder above 43% DTI. FHA loans allow up to 50% DTI with compensating factors (high credit score, large down payment, significant cash reserves). VA loans and USDA loans may also have more flexibility. Some portfolio lenders (who keep loans in-house) may approve higher DTIs. Working to reduce debt before applying significantly improves your chances.' },
  { q: 'How can I lower my debt-to-income ratio?', a: 'Lower DTI two ways: reduce monthly debt payments or increase gross income. To reduce debts: pay off credit cards or small loan balances, refinance to lower payments, or avoid taking on new debt. To increase income: take a second job, freelance, negotiate a raise, or count other income sources (rental, alimony). Even a small income increase meaningfully lowers DTI percentage.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'DTI Calculator',
  url: 'https://loancalculators.app/dti', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Debt-to-Income Ratio',
  step: [
    { '@type': 'HowToStep', name: 'Enter your gross monthly income', text: 'Enter your total gross monthly income before taxes and deductions.' },
    { '@type': 'HowToStep', name: 'Enter all monthly debt payments', text: 'Enter your monthly housing payment (mortgage or rent), car payment, student loans, credit card minimum payments, and any other monthly debt obligations.' },
    { '@type': 'HowToStep', name: 'See your front-end and back-end DTI', text: 'View your front-end DTI (housing only) and back-end DTI (all debts) with a status indicator showing what lenders expect.' },
  ],
}

export default function DTIPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">DTI Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your debt-to-income ratio and see if you qualify for a mortgage. Instant front-end and back-end DTI with lender benchmarks.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111124" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <DTICalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222235" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Know your DTI before applying for a mortgage</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              Debt-to-income ratio (DTI) is one of the most important factors lenders evaluate when approving loans. This DTI calculator shows both your front-end ratio (housing costs only) and back-end ratio (all debts), with instant feedback on where you stand relative to lender standards. Check your DTI before applying for a mortgage so you know whether to pay down debts first or if you are already in a strong position to qualify. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333346" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
