import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MortgageCalculatorWrapper from '@/components/MortgageCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Monthly Payment & Amortization Schedule',
  description:
    'Calculate your monthly mortgage payment with taxes, insurance and PMI. Free mortgage calculator with amortization schedule. Instant results, no signup.',
  alternates: { canonical: 'https://loancalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How do I calculate my monthly mortgage payment?', a: 'Your monthly mortgage payment is calculated using the PMT formula: multiply the loan amount by the monthly interest rate, then divide by 1 minus (1 + monthly rate) to the power of negative loan months. Our mortgage calculator does this instantly as you type.' },
  { q: 'What is included in a mortgage payment?', a: 'A full mortgage payment (PITI) includes Principal (paying down the loan balance), Interest (cost of borrowing), Taxes (property taxes, usually escrowed monthly), and Insurance (homeowner\'s insurance, also escrowed). If your down payment is less than 20%, PMI (private mortgage insurance) is added as well.' },
  { q: 'What is PMI and when do I need it?', a: 'PMI (Private Mortgage Insurance) is required when your down payment is less than 20% of the home price. It protects the lender if you default. PMI typically costs 0.5%–1.5% of the loan amount annually. Once you reach 20% equity, you can request PMI removal.' },
  { q: 'How does the loan term affect my mortgage payment?', a: 'A longer loan term (e.g., 30 years) means lower monthly payments but significantly more total interest paid over the life of the loan. A 15-year mortgage has higher monthly payments but you pay roughly half the total interest and build equity much faster.' },
  { q: 'What is an amortization schedule?', a: 'An amortization schedule shows how each monthly payment is split between principal and interest over the life of your loan. Early in the loan, most of each payment goes to interest. Over time, more goes to principal. Our mortgage calculator generates a full year-by-year amortization table.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Mortgage Calculator',
  url: 'https://loancalculators.app',
  description: 'Free mortgage calculator with monthly payment breakdown, amortization schedule, and PMI calculation.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your Mortgage Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter your home price and down payment', text: 'Enter the home purchase price and your down payment amount. The calculator automatically computes your loan amount and shows if PMI is required.' },
    { '@type': 'HowToStep', name: 'Set your interest rate and loan term', text: 'Enter your interest rate and choose your loan term (10, 15, 20, or 30 years). Include property tax, insurance, and HOA fees for a complete PITI payment.' },
    { '@type': 'HowToStep', name: 'View your monthly payment and amortization schedule', text: 'Your total monthly mortgage payment appears instantly, with a full breakdown and year-by-year amortization schedule showing principal, interest, and remaining balance.' },
  ],
}

const trustSignals = ['🔒 Private', '⚡ Instant', '🎯 Accurate', '✓ Free']

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      {/* Hero */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobglc.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Free Mortgage Calculator
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your monthly mortgage payment with taxes, insurance, and PMI. Full amortization schedule included. Instant results, no signup.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <MortgageCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      {/* Below hero */}
      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private', sub: 'Calculations stay in your browser' },
              { icon: '⚡', label: 'Instant', sub: 'Results update as you type' },
              { icon: '🎯', label: 'Accurate', sub: 'Standard financial formulas' },
              { icon: '✓', label: 'Free', sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">
              Why use a mortgage calculator before you buy?
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              A mortgage calculator helps you understand the true cost of homeownership before signing. By entering your home price, down payment, interest rate, and loan term, you can see your exact monthly payment including principal and interest, property taxes, homeowner&apos;s insurance, and PMI. Comparing different loan terms shows how a 15-year mortgage vs a 30-year mortgage affects both your monthly cash flow and total interest paid. All calculations run entirely in your browser — your financial data never leaves your device.
            </p>
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
