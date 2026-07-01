import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import TipCalculatorWrapper from '@/components/TipCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Tip Calculator — Split Bill Calculator',
  description: 'Calculate tip amount and split the bill between any number of people. Free tip calculator with custom tip percentage and bill splitting. Instant results.',
  alternates: { canonical: 'https://loancalculators.app/tip' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much should I tip at a restaurant?', a: 'The standard restaurant tip in the US is 15–20% for good service, with 20% being the most common benchmark. For exceptional service, 25% or more is appropriate. For buffets or counter service, 10% is common. Coffee shops and quick service typically see $1–2 per order.' },
  { q: 'How do I calculate a 20% tip?', a: 'To calculate a 20% tip mentally: move the decimal one place left to get 10% of the bill, then double it. For a $42.50 bill: 10% = $4.25, doubled = $8.50. Or simply multiply the bill by 0.20. Our tip calculator does this instantly for any percentage.' },
  { q: 'How do I split a bill between multiple people?', a: 'To split a bill: add the tip to the total bill, then divide by the number of people. For a $85 bill with 20% tip ($17), total = $102. Split between 4 people = $25.50 each. Our tip calculator handles any number of people and optionally rounds up to the nearest dollar for easy cash payment.' },
  { q: 'Should I tip on the pre-tax or post-tax amount?', a: 'There is no universal rule, but most etiquette guides suggest tipping on the pre-tax bill amount since the tax is paid to the government, not the server. However, tipping on the post-tax amount is also common and appreciated. The difference on a typical restaurant bill is usually only $1–3.' },
  { q: 'What is a standard tip percentage in 2026?', a: 'In 2026, 20% has become the standard expected tip at full-service restaurants in the US, up from 15% a decade ago. 18% is still considered appropriate for adequate service. Some restaurants now add automatic gratuity (usually 18–20%) for large parties of 6 or more. Check your bill before adding an additional tip.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Tip Calculator',
  url: 'https://loancalculators.app/tip', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate a Tip and Split a Bill',
  step: [
    { '@type': 'HowToStep', name: 'Enter your bill amount', text: 'Type the total bill amount before tip.' },
    { '@type': 'HowToStep', name: 'Select a tip percentage', text: 'Choose 10%, 15%, 18%, 20%, 25%, or enter a custom percentage.' },
    { '@type': 'HowToStep', name: 'Enter number of people and see the split', text: 'Enter how many people are splitting the bill. The calculator shows the tip amount, total bill, and per-person cost instantly.' },
  ],
}

export default function TipPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Tip Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate the tip and split the bill between any number of people. Choose a preset percentage or enter a custom tip. Instant results.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111117" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <TipCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222228" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Calculate tips and split bills instantly</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This tip calculator makes it easy to calculate the right tip and split a restaurant bill between any number of people. Select from common tip percentages (10%, 15%, 18%, 20%, 25%) or enter a custom amount. The round up feature rounds each person&apos;s share to the nearest dollar for easy cash payment. All calculations are instant and private — no data is ever sent to a server.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333339" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
