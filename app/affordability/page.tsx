import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import AffordabilityCalculatorWrapper from '@/components/AffordabilityCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Home Affordability Calculator — How Much House Can I Afford?',
  description: 'Calculate how much home you can afford based on income, debts and down payment. Free home affordability calculator using the 28/36 rule.',
  alternates: { canonical: 'https://loancalculators.app/affordability' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  { q: 'How much house can I afford on my salary?', a: 'A commonly cited rule of thumb is that your home purchase price should be 2.5–3&times; your annual gross income. On a $95,000 salary that suggests $237,500–$285,000. However, this guideline does not account for your existing debts, down payment size, local property taxes, or interest rate — all of which dramatically affect your actual affordable price. Our home affordability calculator uses the 28/36 rule to give you a more precise estimate based on your full financial picture, including debt payments and down payment.' },
  { q: 'What is the 28/36 rule for mortgages?', a: 'The 28/36 rule is the underwriting guideline most lenders use to evaluate mortgage applications. It says that your total monthly housing costs (mortgage P&I, property taxes, insurance, PMI, and HOA) should not exceed 28% of your gross monthly income (front-end DTI), and all debt payments combined (housing plus car loans, student loans, credit card minimums, etc.) should not exceed 36% of gross monthly income (back-end DTI). On a $7,917/month gross income ($95,000/year), the limits are $2,217 for housing and $2,850 for all debts combined. Conventional lenders may allow up to 43–45% back-end DTI with strong compensating factors.' },
  { q: 'How much should I put down on a house?', a: 'A 20% down payment is the traditional benchmark because it eliminates PMI and typically qualifies you for better interest rates. However, many buyers put down far less: FHA loans require only 3.5% down, conventional loans can be as low as 3% through certain programs, and VA loans offer 0% down for eligible veterans. A smaller down payment means a larger loan, higher monthly payment, and usually PMI costs of $50–$200+/month until you reach 20% equity. The right down payment depends on your savings, local home prices, and how long you plan to stay — keeping enough cash reserves for emergencies after closing is just as important as the down payment itself.' },
  { q: 'What is a debt-to-income ratio for a mortgage?', a: 'Debt-to-income (DTI) ratio is expressed as a percentage: your total monthly debt payments divided by your gross monthly income. Lenders look at two versions. Front-end DTI covers only your proposed housing costs (mortgage, taxes, insurance, HOA, PMI) and should be under 28% for conventional loans. Back-end DTI includes all monthly debts — housing plus car payments, student loans, credit card minimums, personal loans, and any other recurring obligations — and should be under 36%–43% for conventional loans. FHA loans allow up to 50% back-end DTI in some cases. Reducing your monthly debt payments before applying is one of the most effective ways to improve your affordability.' },
  { q: 'How do I save for a house down payment?', a: 'Start by determining your target — typically 20% of your expected purchase price plus 2–5% for closing costs (inspections, appraisal, title insurance, and prepaid costs). Open a dedicated high-yield savings account specifically for this goal, separate from your emergency fund. Automate monthly transfers on payday so the money is set aside before you can spend it. Look into first-time homebuyer programs in your state — many offer grants, forgivable loans, or below-market-rate mortgages for qualifying buyers. Use our savings calculator to find out exactly how long it will take at your current savings rate, then adjust contributions as needed to hit your target date.' },
]

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
}
const webAppSchema = {
  '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Home Affordability Calculator',
  url: 'https://loancalculators.app/affordability', applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}
const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Calculate How Much House You Can Afford',
  step: [
    { '@type': 'HowToStep', name: 'Enter your income and existing debts', text: 'Enter your annual gross income and total monthly debt payments (car, student loans, credit cards).' },
    { '@type': 'HowToStep', name: 'Enter down payment, interest rate, and taxes', text: 'Enter your available down payment, current mortgage interest rate, property tax rate, and annual insurance cost.' },
    { '@type': 'HowToStep', name: 'See three affordability scenarios', text: 'View conservative (28% DTI), moderate (36% DTI), and aggressive (43% DTI) maximum home prices based on your inputs.' },
  ],
}

export default function AffordabilityPage() {
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Home Affordability Calculator</h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
              Find out how much house you can afford based on your income, debts, and down payment. See conservative, moderate, and aggressive scenarios using the 28/36 rule.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111123" /></div>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <AffordabilityCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2222222234" /></div>
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-green-900 dark:text-green-300 mb-2">Know your budget before you house hunt</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              This home affordability calculator uses the industry-standard 28/36 debt-to-income rule to calculate the maximum home price you can comfortably afford. It accounts for your income, existing debts, down payment, interest rate, property taxes, and insurance to give you three scenarios: conservative (what you can comfortably afford), moderate (the lender standard), and aggressive (the maximum most lenders will approve). Use this as your starting point before talking to a lender. All calculations run in your browser — your data never leaves your device.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Home Affordability Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The calculator starts from the 28/36 rule to determine the maximum allowable monthly housing payment, then works backward through the mortgage formula to find the maximum loan amount, and finally adds your down payment to arrive at the maximum home price.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Max PITI = Gross Monthly Income &times; DTI Threshold (28%–43%)<br />
              Max P&amp;I = Max PITI &minus; (Property Tax/12) &minus; Insurance/12 &minus; PMI<br />
              Max Loan = Max P&amp;I &times; (1 &minus; (1+r)^&minus;n) / r<br />
              Max Home Price = Max Loan + Down Payment
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The calculator also applies the back-end 36% constraint: your existing monthly debts are subtracted from the maximum total debt payment to find how much room is left for housing costs. The binding constraint — whichever is lower between the front-end 28% limit and the back-end debt-adjusted limit — determines your true maximum home price. Three scenarios (28%, 36%, and 43%) let you see conservative vs. lender-maximum affordability side by side.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Kevin and Maria have a combined gross income of $95,000/year ($7,917/month). They have existing debts of $450/month (car payment + student loan minimum). They have $60,000 saved for a down payment. Current 30-year mortgage rates are 7.0%. Their target area has property taxes of about 1.2%/year and they estimate $150/month for homeowner&apos;s insurance.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Front-end (28%):</strong> Max PITI = $7,917 &times; 0.28 = $2,217/month. Subtract estimated tax ($300K home &times; 1.2% / 12 = $300) and insurance ($150): max P&amp;I = $2,217 &minus; $300 &minus; $150 = $1,767. At 7% over 30 years, that P&amp;I supports a loan of about <strong>$265,000</strong>. With $60,000 down: max home price &asymp; <strong>$325,000</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              <strong>Back-end check (36%):</strong> Max total debts = $7,917 &times; 0.36 = $2,850. Subtract existing debts ($450): remaining for housing = $2,400. That is higher than the $2,217 front-end limit, so the front-end limit is the binding constraint. Kevin and Maria&apos;s conservative maximum is a $325,000 home with $60,000 down — putting them comfortably within both guidelines and leaving buffer for unexpected costs.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect How Much Home You Can Afford</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Gross Income:</strong> Your pre-tax income is the foundation of all DTI calculations. Both wage income and consistent self-employment, rental, or investment income typically count, though lenders may require 2 years of documentation for non-wage income.</li>
              <li><strong className="text-gray-900 dark:text-white">Existing Monthly Debts:</strong> Every dollar of existing debt payment (car loans, student loans, credit card minimums) reduces the amount lenders will allow for a mortgage. Paying off a $400/month car loan before applying can increase your maximum home price by $60,000–$70,000 at 7% rates.</li>
              <li><strong className="text-gray-900 dark:text-white">Down Payment:</strong> A larger down payment directly increases your maximum home price, eliminates PMI at 20%+, and reduces the loan amount. The down payment also signals financial discipline to lenders, sometimes earning a more favorable rate.</li>
              <li><strong className="text-gray-900 dark:text-white">Interest Rate:</strong> Rate changes have a dramatic effect on affordability. The difference between 6.5% and 7.5% on a $300,000 loan is about $180/month — enough to shift your qualifying home price by $25,000–$30,000. Getting pre-approved when rates are favorable locks in a rate for 60–90 days.</li>
              <li><strong className="text-gray-900 dark:text-white">Property Taxes and Insurance:</strong> These non-mortgage costs vary enormously by location. High-tax states can add $400–$700/month in property taxes on a $300,000 home, dramatically reducing what you can actually afford in mortgage principal and interest.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333345" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
