import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SavingsCalculatorWrapper from '@/components/SavingsCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Savings Calculator — Savings Goal Calculator',
  description: 'Calculate how long to reach your savings goal or how much to save monthly. Free savings calculator with compound interest and contribution tracking.',
  alternates: { canonical: 'https://loancalculators.app/savings' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How long does it take to save $10,000?', a: 'Saving $10,000 depends on your monthly contribution and interest rate. Saving $500/month with 4.5% interest starting from $0 takes about 18–19 months. With $1,000/month it takes about 9–10 months. Use this savings calculator with your specific numbers to get an exact timeline.' },
  { q: 'What is a good monthly savings rate?', a: 'Financial experts generally recommend saving at least 20% of your take-home pay, following the 50/30/20 rule (50% needs, 30% wants, 20% savings). For retirement specifically, aim for 15% of gross income. Even starting with 10% is meaningful — the key is to start and increase your savings rate over time.' },
  { q: 'Where should I keep my savings?', a: 'For emergency funds and short-term goals (1–3 years), keep savings in a high-yield savings account (HYSA) or money market account earning 4–5% APY. For medium-term goals (3–7 years), consider CDs or bond funds. For long-term goals (7+ years), consider investing in index funds through a brokerage account.' },
  { q: 'How does interest affect savings growth?', a: 'Interest dramatically accelerates savings growth over time through compounding. At 0% interest, $500/month for 10 years = $60,000 total. At 4.5% APY, that same $500/month grows to about $76,000 — $16,000 more from interest alone. Higher interest rates and longer timeframes amplify this effect significantly.' },
  { q: 'What is a high-yield savings account?', a: 'A high-yield savings account (HYSA) is an FDIC-insured savings account that pays significantly more interest than a traditional savings account. Traditional savings accounts average 0.05–0.10% APY while HYSAs often offer 4–5% APY. They are offered primarily by online banks. There are no extra risks — they carry the same FDIC insurance up to $250,000.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Savings Calculator',
  url: 'https://loancalculators.app/savings', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Time to Reach a Savings Goal',
  step: [
    { '@type': 'HowToStep', name: 'Choose your calculation mode', text: 'Select "How long to reach goal?" to find your timeline, or "How much to save monthly?" to find the required contribution.' },
    { '@type': 'HowToStep', name: 'Enter your savings goal and current savings', text: 'Enter your target savings amount and how much you have already saved.' },
    { '@type': 'HowToStep', name: 'Set your contribution and interest rate', text: 'Enter your monthly savings amount (or target months) and your expected annual interest rate. See your result instantly.' },
  ],
}

export default function SavingsPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Savings Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate how long to reach your savings goal or how much you need to save monthly. Instant results with interest calculation included.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111121" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <SavingsCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222232" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Plan your savings goal with interest</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This savings calculator helps you plan for any goal — emergency fund, down payment, vacation, or major purchase. Two modes: find how long it takes to reach your goal with a set monthly contribution, or find how much you need to save monthly to hit your goal by a specific date. Interest is calculated using the compound interest formula, so your savings grow faster the longer you save. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333343" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
