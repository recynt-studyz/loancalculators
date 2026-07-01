import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import SalaryCalculatorWrapper from '@/components/SalaryCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Salary Calculator — Hourly to Annual Salary Converter',
  description: 'Convert between hourly, weekly, biweekly, monthly and annual salary instantly. Free salary calculator with overtime and vacation day adjustments.',
  alternates: { canonical: 'https://loancalculators.app/salary' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How do I convert hourly to annual salary?', a: 'To convert hourly to annual salary: multiply your hourly rate by hours per week, then by weeks per year. The standard formula is hourly × 40 hours × 52 weeks = annual salary. For example, $20/hour × 40 × 52 = $41,600 per year. This salary calculator converts between all pay periods instantly.' },
  { q: 'How much is $20 an hour annually?', a: '$20 per hour equals $41,600 per year working standard full-time hours (40 hours/week, 52 weeks/year). After accounting for 10 vacation days, it is approximately $40,800 per year. Before taxes, the biweekly paycheck at $20/hour would be about $1,600.' },
  { q: 'How many hours are in a work year?', a: 'A standard work year has 2,080 hours (40 hours × 52 weeks). After subtracting 10 federal holidays and typical vacation days, many people work approximately 1,920–2,000 hours per year. Our salary calculator lets you input your actual hours per week and vacation days for a more accurate conversion.' },
  { q: 'What is biweekly vs semimonthly pay?', a: 'Biweekly pay is issued every two weeks — 26 paychecks per year. Semimonthly pay is issued twice per month — 24 paychecks per year. Biweekly employees receive a third paycheck in two months each year. At the same annual salary, biweekly paychecks are slightly smaller than semimonthly ones but you get two extra per year.' },
  { q: 'How do I calculate overtime pay?', a: 'Under federal law (FLSA), overtime is paid at 1.5× your regular hourly rate for all hours worked beyond 40 in a week. If you earn $20/hour, your overtime rate is $30/hour. Some states have daily overtime rules. Overtime is calculated on the regular rate before any bonuses or supplemental pay.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Salary Calculator',
  url: 'https://loancalculators.app/salary', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Convert Salary Between Pay Periods',
  step: [
    { '@type': 'HowToStep', name: 'Enter your pay in any field', text: 'Type your hourly, daily, weekly, biweekly, monthly, or annual salary in any field — all other fields update instantly.' },
    { '@type': 'HowToStep', name: 'Adjust hours per week and vacation days', text: 'Enter your actual hours per week and vacation days for a more accurate conversion that reflects your real working schedule.' },
    { '@type': 'HowToStep', name: 'See federal tax estimate', text: 'View an estimated federal income tax breakdown including Social Security and Medicare withholding based on your filing status.' },
  ],
}

export default function SalaryPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Salary Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Convert between hourly, daily, weekly, biweekly, monthly, and annual salary. Enter any field and all others update instantly.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111116" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <SalaryCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222227" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Convert salary between all pay periods</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              Whether you are comparing a job offer, negotiating a salary, or trying to understand your true hourly rate, this salary calculator instantly converts between all common pay periods. Type in your hourly rate to see annual salary, or enter your annual salary to find your equivalent hourly wage. The federal tax estimate gives you a rough sense of your take-home pay based on 2026 brackets.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333338" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
