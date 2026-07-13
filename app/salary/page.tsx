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
  { q: 'How do I convert hourly to annual salary?', a: 'To convert hourly to annual salary, multiply your hourly rate by your hours per week, then by 52 weeks per year. The standard formula is: hourly &times; 40 hours &times; 52 weeks = annual salary. At $25/hour that equals $52,000/year. If you take paid vacation, your annual earnings stay the same but your hourly equivalent shifts slightly depending on how you count those days. Our salary calculator adjusts for actual working hours and vacation days so you get a more accurate comparison, especially when evaluating job offers with different benefits packages.' },
  { q: 'How much is $20 an hour annually?', a: '$20 per hour equals $41,600 per year at standard full-time hours (40 hours/week, 52 weeks/year). After accounting for 10 paid vacation days, your working hours drop slightly, but your annual pay stays at $41,600 since vacation days are paid. Biweekly, that is a gross paycheck of $1,600 before taxes. After federal income tax, Social Security (6.2%), and Medicare (1.45%), a single filer with no deductions would take home roughly $1,300–$1,350 biweekly, depending on filing status and state taxes.' },
  { q: 'How many hours are in a work year?', a: 'A standard work year contains 2,080 hours (40 hours &times; 52 weeks). After subtracting 10 federal holidays, the typical working year is around 1,960–2,000 hours, depending on your employer\'s holiday schedule. If you also take 10 days of vacation, your actual worked hours may be closer to 1,880–1,920. Our salary calculator lets you input your actual hours per week and number of vacation days to produce a precise conversion that reflects your real working schedule rather than a theoretical standard.' },
  { q: 'What is biweekly vs semimonthly pay?', a: 'Biweekly pay means you receive a paycheck every two weeks — 26 paychecks per year. Semimonthly pay is issued twice per calendar month, on set dates like the 1st and 15th — 24 paychecks per year. If your annual salary is the same, biweekly paychecks are slightly smaller ($52,000 / 26 = $2,000) than semimonthly ($52,000 / 24 = $2,167). However, biweekly employees receive two extra paychecks per year compared to semimonthly. This matters for budgeting since those two "extra" months can help with annual expenses like insurance or holiday costs.' },
  { q: 'How do I calculate overtime pay?', a: 'Under federal law (FLSA), overtime is paid at 1.5&times; your regular hourly rate for all hours worked beyond 40 in a single workweek. If your regular rate is $22/hour, your overtime rate is $33/hour. Some states — including California — require daily overtime for hours beyond 8 in a day. To calculate total weekly pay with overtime: (40 &times; regular rate) + (overtime hours &times; 1.5 &times; regular rate). Our salary calculator factors in weekly overtime hours so you can see the impact on your annual income and determine your effective hourly rate when overtime is included.' },
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
              Whether you are comparing a job offer, negotiating a salary, or trying to understand your true hourly rate, this salary calculator instantly converts between all common pay periods. Type in your hourly rate to see annual salary, or enter your annual salary to find your equivalent hourly wage. The federal tax estimate gives you a rough sense of your take-home pay based on 2026 brackets. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Salary Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Salary conversions use simple arithmetic based on the number of working hours, days, weeks, and months in a year. The standard assumptions are 40 hours per week and 52 weeks per year, but these are adjustable to reflect your actual schedule. All conversions flow from a single consistent annual figure:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Annual = Hourly &times; Hours/Week &times; (52 &minus; Vacation Weeks)<br />
              Monthly = Annual &divide; 12<br />
              Biweekly = Annual &divide; 26<br />
              Weekly = Annual &divide; 52<br />
              Daily = Hourly &times; Hours/Day
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The federal tax estimate uses 2026 income tax brackets and standard deductions to approximate your annual tax liability, then divides by your pay period count to show per-paycheck withholding. It also applies 6.2% Social Security tax (up to the wage base) and 1.45% Medicare tax. This estimate is approximate — actual withholding depends on your W-4 elections, pre-tax benefits, and state taxes, which are handled more precisely in the paycheck calculator.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Alex receives a job offer at $25/hour, working 40 hours per week. The company offers 10 days of paid vacation. Alex wants to understand the full salary picture before comparing it to a current salaried position at $52,000/year.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Annual salary: $25 &times; 40 hours &times; 52 weeks = <strong>$52,000/year</strong>. The jobs pay identically on paper. But the hourly role allows overtime: if Alex works 5 hours of overtime per week, annual earnings jump to $52,000 + ($37.50/hr overtime &times; 5 hrs &times; 52 weeks) = $52,000 + $9,750 = <strong>$61,750/year</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Breaking down the $52,000 base: Monthly = $4,333. Biweekly paycheck (gross) = $2,000. Estimated federal income tax for a single filer: roughly $6,100/year. Social Security: $3,224. Medicare: $754. Federal taxes total: ~$10,078/year, leaving estimated annual net pay of about $41,900, or roughly $1,612 per biweekly paycheck after federal taxes only. State income taxes would reduce take-home further.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Salary Conversion</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Hours Per Week:</strong> The standard 40 hours is a starting point, but part-time workers, contractors, and those with flexible schedules may work significantly more or fewer hours. Entering your actual hours produces a more accurate hourly equivalent.</li>
              <li><strong className="text-gray-900 dark:text-white">Vacation and Holidays:</strong> Paid time off does not reduce your annual salary for a salaried employee, but it does affect your effective hourly rate (total compensation divided by hours actually worked). A job with 20 PTO days has a higher effective hourly rate than one with 5 days at the same stated salary.</li>
              <li><strong className="text-gray-900 dark:text-white">Overtime:</strong> Hourly workers earn 1.5&times; their rate for hours over 40/week under federal law. This can substantially increase total annual compensation for workers in industries with frequent overtime.</li>
              <li><strong className="text-gray-900 dark:text-white">Pay Frequency:</strong> Biweekly (26 paychecks) vs. semimonthly (24 paychecks) affects per-paycheck amounts even at the same annual salary. Knowing your pay frequency matters for budgeting and understanding why some months have &ldquo;extra&rdquo; paychecks.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333338" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
