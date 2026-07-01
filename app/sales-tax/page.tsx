import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SalesTaxCalculatorWrapper from '@/components/SalesTaxCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sales Tax Calculator — Calculate Tax by State 2026',
  description: 'Calculate sales tax for all 50 US states instantly. Free sales tax calculator with 2026 state tax rates. Find total price after tax for any purchase.',
  alternates: { canonical: 'https://loancalculators.app/sales-tax' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How do I calculate sales tax?', a: 'To calculate sales tax: multiply the pre-tax price by the tax rate as a decimal. For example, a $100 item in Texas (6.25% state tax) = $100 × 0.0625 = $6.25 in tax, for a total of $106.25. Our sales tax calculator does this instantly for all 50 states plus any local tax.' },
  { q: 'Which states have no sales tax?', a: 'Five states have no state-level sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, some localities in Alaska do charge local sales tax. If you shop online, whether you owe sales tax depends on whether the seller has nexus in your state.' },
  { q: 'What is the highest sales tax state?', a: 'California has the highest base state sales tax at 7.25%. However, combined state and local rates can be much higher. Louisiana (4.45% + high local rates), Tennessee (7% + local), and Arkansas (6.5% + local) often have among the highest combined rates when including city and county taxes.' },
  { q: 'Is sales tax charged on services?', a: 'In most US states, sales tax applies to tangible goods but not services. However, about 20 states do tax some services. Hawaii taxes nearly all services. New Mexico taxes most services. Texas taxes some services. The rules vary significantly by state and service type.' },
  { q: 'How do I add sales tax to a price?', a: 'To add sales tax to a price: multiply the price by (1 + tax rate). For example, $50 item with 8% tax = $50 × 1.08 = $54. Our sales tax calculator shows you the tax amount and final price separately so you can see exactly how much tax is added to any purchase amount.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Sales Tax Calculator',
  url: 'https://loancalculators.app/sales-tax', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Sales Tax',
  step: [
    { '@type': 'HowToStep', name: 'Enter the pre-tax price', text: 'Type the item price before sales tax is applied.' },
    { '@type': 'HowToStep', name: 'Select your state', text: 'Choose your state from the dropdown. The 2026 state sales tax rate is pre-filled automatically.' },
    { '@type': 'HowToStep', name: 'Add any local tax and see the total', text: 'Add any additional local tax percentage if applicable. The calculator instantly shows the tax amount and total price.' },
  ],
}

export default function SalesTaxPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Sales Tax Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate sales tax for all 50 US states with 2026 rates. Enter your price, select your state, and see the tax and total instantly.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111118" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <SalesTaxCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222229" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">2026 sales tax rates for all 50 states</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This sales tax calculator includes 2026 base state sales tax rates for all 50 US states. State tax rates range from 0% (Alaska, Delaware, Montana, New Hampshire, Oregon) to 7.25% (California). Most purchases also incur local city and county taxes — use the additional local tax field to add your exact local rate. Remember that sales tax on big purchases like cars can add thousands to the total price. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333340" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
