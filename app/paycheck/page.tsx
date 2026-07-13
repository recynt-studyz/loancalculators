import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import PaycheckCalculatorWrapper from '@/components/PaycheckCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Take-Home Pay After Taxes',
  description: 'Calculate your take-home pay after federal taxes, state taxes, Social Security and Medicare. Free paycheck calculator for all 50 states.',
  alternates: { canonical: 'https://loancalculators.app/paycheck' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much tax is taken out of my paycheck?', a: 'Total paycheck deductions typically include federal income tax (10%–37% depending on income and filing status), Social Security (6.2% up to the wage base of $176,100 in 2026), Medicare (1.45% on all wages), and state income tax (0%–13.3% depending on your state). For a single filer earning $75,000/year paid biweekly, a rough estimate might be: federal income tax ~$7,400/year (~$285/paycheck), Social Security ~$4,650/year (~$179/paycheck), Medicare ~$1,088/year (~$42/paycheck), and state tax varies widely. Total federal + FICA alone often amounts to 20–30% of gross pay for most middle-income workers.' },
  { q: 'What is FICA tax?', a: 'FICA (Federal Insurance Contributions Act) is the combined Social Security and Medicare payroll tax withheld from every paycheck. Employees pay 6.2% of wages for Social Security on income up to $176,100 (the 2026 wage base) and 1.45% for Medicare on all wages with no cap. Your employer matches both of these amounts, effectively paying another 7.65% on your behalf — a cost invisible to most employees. An additional 0.9% Medicare surtax applies to wages above $200,000 for single filers ($250,000 for married filing jointly). Self-employed individuals pay the full combined 15.3% as self-employment tax, though they can deduct half of it on their tax return.' },
  { q: 'How do I increase my take-home pay?', a: 'Several strategies can legally increase your net paycheck. Contributing to a traditional 401k or traditional IRA reduces your taxable income dollar-for-dollar, lowering federal (and often state) withholding. Health insurance premiums paid through employer-sponsored plans are pre-tax, further reducing taxable income. Contributing to a Dependent Care FSA (up to $5,000/year) or Health FSA reduces taxable wages for childcare or medical expenses. Updating your W-4 to accurately reflect dependents, itemized deductions, or multiple jobs prevents over-withholding. Note: a large tax refund in April means you over-withheld all year — adjusting your W-4 with HR lets you receive that money in each paycheck instead.' },
  { q: 'What is the difference between gross and net pay?', a: 'Gross pay is your total compensation before any deductions — the salary figure you negotiated or the hourly rate times hours worked. Net pay (take-home pay) is what actually lands in your bank account after federal income tax, state income tax, Social Security, Medicare, 401k contributions, health insurance premiums, dental, vision, and any other pre- or post-tax deductions are withheld. For most employees, net pay is 65–80% of gross pay. The exact percentage depends on your tax bracket, filing status, benefit elections, and state of residence.' },
  { q: 'How does my 401k contribution affect my paycheck?', a: 'Traditional 401k contributions are pre-tax: they reduce your taxable income before federal and state taxes are calculated. A 6% contribution on a $3,000 gross biweekly paycheck = $180 deducted. However, because your taxable income decreases by $180, your federal withholding also drops. If you are in the 22% federal bracket, your federal tax falls by $180 &times; 22% = $39.60. So the net reduction to your take-home pay is only $180 &minus; $39.60 = about $140 — not the full $180. You are effectively funding $180 of retirement savings for a cost of only $140 in reduced take-home pay, making traditional 401k contributions one of the most tax-efficient ways to save.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Paycheck Calculator',
  url: 'https://loancalculators.app/paycheck', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate Your Take-Home Pay',
  step: [
    { '@type': 'HowToStep', name: 'Enter your gross pay and frequency', text: 'Enter your gross pay per period and select how often you are paid (weekly, biweekly, semi-monthly, or monthly).' },
    { '@type': 'HowToStep', name: 'Enter filing status, state, and deductions', text: 'Select your federal filing status, your state, and enter any 401k contributions or health insurance premiums.' },
    { '@type': 'HowToStep', name: 'See your detailed net pay breakdown', text: 'View a line-by-line breakdown of all deductions including federal tax, state tax, Social Security, Medicare, and pre-tax benefits to see your exact take-home pay.' },
  ],
}

export default function PaycheckPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Paycheck Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your take-home pay after federal taxes, state taxes, FICA, and deductions. All 50 states supported with 2026 tax rates.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111125" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <PaycheckCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222236" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">See exactly what comes out of your paycheck</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This paycheck calculator uses 2026 federal income tax brackets and state income tax rates to estimate your take-home pay. Pre-tax deductions like 401k contributions and health insurance premiums are subtracted before calculating federal and state taxes, showing their true tax savings. State income tax rates are approximate — your actual withholding may vary based on your W-4 elections and employer policies. Always verify with your actual pay stub. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Paycheck Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Paycheck calculation follows a specific order of operations. Pre-tax deductions come out first, then FICA taxes are applied to gross wages, then federal and state income taxes are applied to reduced taxable income, and finally any post-tax deductions are subtracted.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Taxable Income = Gross Pay &minus; Pre-Tax Deductions (401k, HSA, health ins.)<br />
              Federal Tax = Progressive bracket calculation on annualized taxable income<br />
              State Tax = Taxable Income &times; State Rate (flat or progressive)<br />
              Social Security = Gross Pay &times; 6.2% (up to annual wage base)<br />
              Medicare = Gross Pay &times; 1.45%<br />
              Net Pay = Gross &minus; Federal &minus; State &minus; SS &minus; Medicare &minus; Post-Tax Deductions
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Federal income tax uses the IRS&apos;s progressive bracket system — your income is taxed at different rates in layers (10% on the first portion, 12% on the next, and so on up to 37%). The calculator annualizes your per-paycheck income, applies the bracket math, then divides by the number of pay periods for the per-paycheck withholding amount.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Nicole earns $75,000/year as a single filer in Colorado (flat 4.4% state income tax), paid biweekly. She contributes 6% to her traditional 401k and pays $120/paycheck for health insurance.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Gross biweekly pay: $75,000 / 26 = <strong>$2,885</strong>. Pre-tax deductions: 401k = $2,885 &times; 6% = $173 + health insurance = $120. Total pre-tax deductions: $293. Federal taxable income per paycheck: $2,885 &minus; $293 = $2,592 (annualized: ~$67,400). Estimated federal withholding: ~$260/paycheck. State tax: $2,885 &times; 4.4% = ~$127. Social Security: $2,885 &times; 6.2% = $179. Medicare: $2,885 &times; 1.45% = $42.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Total deductions per paycheck: $260 (federal) + $127 (state) + $179 (SS) + $42 (Medicare) + $293 (pre-tax benefits) = <strong>$901</strong>. <strong>Estimated net (take-home) pay: $2,885 &minus; $901 = approximately $1,984/biweekly paycheck</strong> ($51,584 annually). Her effective combined tax rate on gross pay is about 21%. The 401k contribution of $173 only reduced her take-home by about $130 after the tax savings — illustrating the efficiency of pre-tax retirement savings.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Take-Home Pay</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Filing Status:</strong> Single, Married Filing Jointly, Married Filing Separately, and Head of Household each use different tax brackets and standard deduction amounts. Married Filing Jointly almost always results in lower total tax than two Single returns, and Head of Household provides a larger standard deduction than Single status.</li>
              <li><strong className="text-gray-900 dark:text-white">State of Residence:</strong> State income tax ranges from 0% (Texas, Florida, Nevada, and 6 other states) to over 13% in California for high earners. Moving to a no-income-tax state can be worth thousands per year for high earners. The calculator supports all 50 states with approximate 2026 rates.</li>
              <li><strong className="text-gray-900 dark:text-white">Pre-Tax Deductions:</strong> Traditional 401k, 403b, HSA, FSA, and employer health insurance premiums all reduce your taxable income before federal and state taxes are calculated. Maximizing these deductions is the most effective legal way to increase your take-home pay.</li>
              <li><strong className="text-gray-900 dark:text-white">Pay Frequency:</strong> Weekly, biweekly, semimonthly, and monthly pay schedules affect withholding calculations. The IRS withholding tables are designed to produce approximately the right annual total regardless of frequency, but slight differences can occur, especially for variable income.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333347" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
