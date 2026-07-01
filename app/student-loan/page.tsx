import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import StudentLoanCalculatorWrapper from '@/components/StudentLoanCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Student Loan Calculator — Payment & Payoff Planner',
  description: 'Calculate student loan monthly payments and total interest for federal and private loans. Free student loan calculator with repayment plan comparison.',
  alternates: { canonical: 'https://loancalculators.app/student-loan' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'What is the average student loan payment?', a: 'The average monthly student loan payment is around $350–$400 for borrowers on standard 10-year repayment plans. However, this varies widely based on total debt, interest rate, and repayment plan. Use this student loan calculator to find your exact payment based on your balance and rate.' },
  { q: 'What is the difference between federal and private loans?', a: 'Federal student loans offer income-driven repayment plans, potential forgiveness programs, deferment, and forbearance options. They have fixed rates set by Congress. Private loans are issued by banks and credit unions with variable or fixed rates based on your credit. Private loans generally lack federal protections and repayment flexibility.' },
  { q: 'How do income-driven repayment plans work?', a: 'Income-driven repayment (IDR) plans cap your monthly payment at a percentage of your discretionary income (typically 5–20%). After 20–25 years of qualifying payments, any remaining balance may be forgiven. Common plans include IBR (Income-Based Repayment), PAYE, SAVE, and ICR. This calculator estimates the standard repayment amount.' },
  { q: 'Can I pay off my student loans early?', a: 'Yes. Federal and private student loans generally have no prepayment penalty. Paying extra each month or making lump-sum payments reduces your principal faster, saving significant interest over the loan life. Even an extra $50–$100/month can save thousands and cut years off your repayment.' },
  { q: 'What happens if I cannot make my student loan payment?', a: 'Federal loan borrowers can apply for deferment (temporary suspension of payments) or forbearance (reduced or paused payments) during financial hardship. Income-driven repayment can also lower payments to as little as $0/month for qualifying borrowers. Private loan options vary by lender — contact them directly about hardship programs.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Student Loan Calculator',
  url: 'https://loancalculators.app/student-loan', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Student Loan Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter your loan balance and interest rate', text: 'Enter your total student loan balance and your current interest rate.' },
    { '@type': 'HowToStep', name: 'Choose federal or private and select repayment plan', text: 'Select whether your loans are federal or private. For federal loans, choose your repayment plan (Standard, Graduated, Extended, or Income-Based).' },
    { '@type': 'HowToStep', name: 'See your monthly payment and total interest', text: 'View your monthly payment, total amount paid, total interest, and payoff date instantly.' },
  ],
}

export default function StudentLoanPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Student Loan Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate student loan payments for federal and private loans across all repayment plans. See your payoff date and total interest instantly.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111114" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <StudentLoanCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222225" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Plan your student loan repayment</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This student loan calculator helps you compare federal repayment plans and estimate your monthly payment and total interest for both federal and private loans. Federal loans offer Standard (10-year), Graduated, Extended (25-year), and Income-Based plans. Federal loans may also qualify for forgiveness programs — this calculator estimates standard repayment only. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333336" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
