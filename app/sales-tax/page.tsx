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
  { q: 'How do I calculate sales tax?', a: 'To calculate sales tax, multiply the pre-tax price by the tax rate expressed as a decimal. For example, a $500 item in Texas (6.25% state tax) = $500 &times; 0.0625 = $31.25 in state tax, for a subtotal of $531.25. If your city or county adds a local tax, add those rates together first. In Houston, TX, the combined rate is 8.25% (6.25% state + 2% local), so $500 &times; 0.0825 = $41.25 in total tax, bringing the total to $541.25. Our calculator handles state and local tax separately so you can see exactly how much each layer adds.' },
  { q: 'Which states have no sales tax?', a: 'Five states have no state-level sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, Alaska is a partial exception — while the state itself levies no sales tax, many Alaskan cities and boroughs impose local sales taxes ranging from 1% to 7%. Delaware, Montana, New Hampshire, and Oregon have no sales tax at the state or local level. If you are considering a large purchase, buying in a no-tax state can produce meaningful savings — though some states require residents to self-report and pay a use tax on items purchased out of state.' },
  { q: 'What is the highest sales tax state?', a: 'California has the highest base state sales tax at 7.25%. When combined with local district taxes, rates in some California cities exceed 10.75%. Other high-combined-rate states include Louisiana (4.45% state + high locals, averaging ~9.5% combined), Tennessee (7% state + locals, averaging ~9.5%), and Arkansas (6.5% state + locals, averaging ~9.4%). The Tax Foundation tracks combined state and local rates annually. For major purchases, the combined rate — not just the state rate — is what you will actually pay.' },
  { q: 'Is sales tax charged on services?', a: 'In most US states, sales tax applies to tangible personal property (physical goods) but not services. However, the rules vary significantly: about 20 states tax some categories of services. Hawaii and New Mexico tax nearly all services. Texas taxes certain repair services, data processing, and telecommunications. New York taxes some personal services. The line between taxable and non-taxable services is often unclear and frequently litigated. For large service contracts, it is worth verifying your specific state\'s rules with the state department of revenue.' },
  { q: 'How do I add sales tax to a price?', a: 'To add sales tax to a price, multiply by (1 + tax rate as a decimal). For example, a $1,200 laptop with 9% combined sales tax: $1,200 &times; 1.09 = $1,308 total. To work backward from a total price to find the pre-tax price, divide by (1 + rate): $1,308 / 1.09 = $1,200. This reverse calculation is useful when a price is advertised as tax-inclusive (common in some retail contexts). Our sales tax calculator supports both add-tax and reverse calculations so you can find the pre-tax price from a total if needed.' },
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

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Sales Tax Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Sales tax in the United States is calculated at the point of sale by multiplying the taxable purchase price by the combined state and local tax rate. The tax is collected by the retailer and remitted to the state government. The formula is simple:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Tax Amount = Pre-Tax Price &times; (State Rate + Local Rate)<br />
              Total Price = Pre-Tax Price + Tax Amount<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= Pre-Tax Price &times; (1 + Combined Rate)
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Because the US has no national sales tax, rates vary dramatically by location — not just by state but sometimes by city, county, and even special taxing district. The same item bought in one part of a state may be taxed differently than in another part of the same state. Our calculator pre-populates the state base rate for 2026 and provides a separate field for you to add any local tax applicable to your specific location, giving you an accurate combined rate.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Madison is buying a $1,500 laptop in Chicago, Illinois. Illinois has a 6.25% state sales tax. Chicago adds an additional 1.25% city tax and Cook County adds 1.75%, for a total local addition of 3.0%. The combined rate is 6.25% + 3.0% = <strong>9.25%</strong>.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Sales tax on $1,500 at 9.25%: $1,500 &times; 0.0925 = <strong>$138.75</strong>. Total price: $1,500 + $138.75 = <strong>$1,638.75</strong>. If Madison drove to suburban Cook County where the local rate is lower (say 8.5% combined), she would pay $1,500 &times; 0.085 = $127.50 in tax — saving $11.25 compared to buying in the city.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              For bigger purchases like a $35,000 car, the difference is dramatic. At 9.25% combined rate, sales tax alone is $3,237.50. In a no-sales-tax state like Oregon or Delaware, that same car costs $3,237.50 less at purchase. However, most states require residents to pay a use tax if they register a vehicle purchased out of state, so the savings may not be as large as they appear.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Sales Tax Calculation</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">State Base Rate:</strong> Every state with a sales tax has a base rate that applies statewide. This ranges from 0% in five states to 7.25% in California. State rates change infrequently but do change — always verify the current rate for major purchases.</li>
              <li><strong className="text-gray-900 dark:text-white">Local Tax Rates:</strong> Cities, counties, and special taxing districts can add their own rates on top of the state rate. In some metro areas, the local add-on can be 2–3%, significantly increasing the total. For precise calculations on large purchases, look up your specific city and county rates on your state&apos;s department of revenue website.</li>
              <li><strong className="text-gray-900 dark:text-white">Taxable vs. Non-Taxable Items:</strong> Not all purchases are subject to sales tax. Groceries are exempt in many states (though not all). Prescription medications are almost universally exempt. Clothing is exempt in several states including Pennsylvania, New Jersey, and New York (below a per-item threshold). Knowing what is exempt can reduce your effective tax burden.</li>
              <li><strong className="text-gray-900 dark:text-white">Purchase Size:</strong> Sales tax matters much more on large purchases. On a $30 item, 1% more tax is $0.30. On a $30,000 vehicle, 1% more tax is $300. For large discretionary purchases, the tax implications are worth factoring into your decision.</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333340" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
