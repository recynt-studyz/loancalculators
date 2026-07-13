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
  { q: 'How long does it take to save $10,000?', a: 'How long it takes to save $10,000 depends on your starting balance, monthly contribution, and interest rate. Saving $400/month in a high-yield savings account at 4.5% APY starting from $0 takes about 23 months. At $600/month with the same rate and no starting balance, you reach $10,000 in approximately 16 months. With $2,500 already saved and $400/month at 4.5%, it takes about 18 months. Use this savings calculator with your exact numbers — the difference a few hundred dollars per month makes is often surprising.' },
  { q: 'What is a good monthly savings rate?', a: 'Most financial experts recommend saving at least 20% of your take-home pay, following the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. For retirement specifically, aim for 15% of gross income including any employer match. For general savings goals, the right amount depends on your timeline and target — use this calculator to work backward from your goal date to find the monthly contribution required. Even starting with 10% is meaningful; the most important step is to begin and automate your savings so it happens before you have a chance to spend.</p>' },
  { q: 'Where should I keep my savings?', a: 'For emergency funds and short-term goals (under 1–2 years), keep savings in a high-yield savings account (HYSA) or money market account, currently earning 4–5% APY. These accounts are FDIC-insured up to $250,000 and let you access money without penalty. For medium-term goals (2–5 years), consider a CD ladder or short-term bond fund for slightly better returns. For long-term goals (5+ years), consider investing in index funds through a brokerage account — higher risk but historically much higher returns. The key principle: match your account type to your time horizon.' },
  { q: 'How does interest affect savings growth?', a: 'Interest accelerates savings growth through the power of compounding — your interest earns interest. At 0% interest, $500/month for 5 years = $30,000. At 4.5% APY, that same $500/month grows to about $33,400 — $3,400 more from interest alone. Over longer periods, the effect is more dramatic: $500/month for 20 years at 0% = $120,000; at 4.5% it grows to roughly $193,000. Maximizing your savings account yield (even a 1–2% improvement) adds up meaningfully over time, especially for long-horizon goals like a home down payment.' },
  { q: 'What is a high-yield savings account?', a: 'A high-yield savings account (HYSA) is an FDIC-insured savings account that pays significantly more interest than a traditional savings account. While brick-and-mortar bank savings accounts often pay as little as 0.01–0.10% APY, HYSAs offered by online banks typically yield 4–5% APY. There is no additional risk — the same $250,000 FDIC insurance limit applies, and these accounts function identically to regular savings accounts in terms of access and security. The main tradeoff is that online banks have no physical branches. Popular providers include Marcus, Ally, Synchrony, and SoFi.' },
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

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Savings Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This calculator uses the future value of an annuity formula to project how your savings grow when you make regular monthly contributions and earn interest. The core formula combines growth on your existing savings with the accumulation of new contributions:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              FV = P &times; (1+r)^n + PMT &times; [(1+r)^n &minus; 1] / r
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Where <strong>P</strong> is your current savings balance, <strong>r</strong> is the monthly interest rate (annual APY / 12), <strong>n</strong> is the number of months, and <strong>PMT</strong> is your monthly contribution. For &ldquo;solve for months,&rdquo; the calculator iterates until FV reaches your target. For &ldquo;solve for monthly contribution,&rdquo; it rearranges the formula to solve for PMT directly.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Interest compounds monthly in line with how most high-yield savings accounts work. The calculator shows both the total you will contribute and the total interest earned separately, so you can see exactly how much of your goal is funded by your own savings versus interest growth.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Melissa wants to save $20,000 for a home down payment. She already has $2,500 in savings and can contribute $550/month. She plans to keep the money in a high-yield savings account earning 4.5% APY.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Monthly rate r = 4.5% / 12 = 0.375%. Starting balance P = $2,500. PMT = $550. Solving for n (months to reach $20,000): after approximately <strong>30 months</strong> (2 years 6 months), her balance crosses $20,000. She will contribute $2,500 + ($550 &times; 30) = $19,000 of her own money, with interest accounting for the remaining $1,000+.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If Melissa could increase her monthly contribution to $700, she would reach $20,000 in about <strong>24 months</strong> — saving 6 months. Alternatively, if she only has 24 months and needs to know exactly how much to save each month, switching to the &ldquo;how much to save monthly&rdquo; mode with a 24-month target and the same interest rate tells her she needs to contribute approximately <strong>$689/month</strong> to hit her goal on schedule.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Savings Timeline</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Monthly Contribution:</strong> The single biggest lever in your control. Even an extra $100/month can shave months off your timeline. Automating your savings on payday is the most reliable way to stay consistent — you cannot spend what you never see.</li>
              <li><strong className="text-gray-900 dark:text-white">Starting Balance:</strong> Money you already have saved compounds immediately, giving it more time to grow. A $2,500 head start at 4.5% for 2.5 years grows to about $2,800 — a free $300 for money you already had. Any windfall (tax refund, bonus, gift) that goes directly into savings has an outsized long-term impact.</li>
              <li><strong className="text-gray-900 dark:text-white">Interest Rate (APY):</strong> The difference between 0.5% (traditional savings) and 4.5% (high-yield savings) on a $550/month contribution over 30 months is about $600 in extra interest earned. Maximizing your APY with an HYSA is one of the easiest, lowest-effort financial improvements available.</li>
              <li><strong className="text-gray-900 dark:text-white">Goal Amount and Timeline:</strong> Clearly defining your target amount and deadline creates the constraint that determines the required monthly contribution. Working backward from the goal date is often more motivating than working forward from a fixed contribution amount.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333343" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
