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
  { q: 'How much should I tip at a restaurant?', a: 'The standard restaurant tip in the US is 15–20% for good service, with 20% being the most common benchmark today. For truly exceptional service, 25% or more is appreciated. For counter service or fast casual where you order at the register, tipping is optional but 10–15% is common. For buffets, 10% is typical since servers do less work. For food delivery, 15–20% of the order total is standard, though tipping more for long-distance orders or bad weather is a common courtesy.' },
  { q: 'How do I calculate a 20% tip?', a: 'The fastest way to calculate 20% mentally is to move the decimal one place left (giving you 10%), then double that result. For a $46.00 bill: 10% = $4.60, doubled = $9.20 tip, total = $55.20. Alternatively, multiply the bill by 0.20. For 15%, take 10% and add half: 10% of $46.00 = $4.60, half of that = $2.30, sum = $6.90 tip. Our tip calculator handles any percentage instantly, including custom percentages, so you never need to do the mental math at the table.' },
  { q: 'How do I split a bill between multiple people?', a: 'To split a bill evenly: add the tip to the total, then divide by the number of people. For example, a $92.00 dinner for 4 people with a 20% tip: tip = $18.40, total = $110.40, per person = $27.60. For cash situations, you may want to round up to the nearest dollar ($28/person) so the server gets a slightly better tip. Our calculator handles any group size and includes a round-up option for easy cash payments. If people ordered very different amounts, consider splitting by item using a restaurant bill splitting app.' },
  { q: 'Should I tip on the pre-tax or post-tax amount?', a: 'Most etiquette guides recommend tipping on the pre-tax bill amount, since the sales tax goes to the government rather than the server. However, tipping on the post-tax total is also widely practiced and always appreciated. On a typical $60 meal in a state with 8% sales tax, the difference between tipping on pre-tax ($60) versus post-tax ($64.80) at 20% is about $0.96 — less than a dollar. Since the practical impact is so small, the most important factor is simply tipping a fair amount for the quality of service, regardless of which base amount you use.' },
  { q: 'What is a standard tip percentage in 2026?', a: 'In 2026, 20% has become the widely expected standard tip at full-service restaurants in the US, reflecting years of gradual upward drift from the old 15% norm. Many restaurant payment terminals now default to 18%, 20%, and 22% as their preset options, nudging customers toward higher amounts. For large parties of 6 or more, most restaurants now add an automatic gratuity of 18–20% — always check your bill before adding an additional tip on top. For exceptional service or if you are a regular at a neighborhood spot, 25% or more is a generous way to show appreciation.' },
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

          {/* How It Works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Tip Calculator Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Tip calculation is straightforward arithmetic, but doing it quickly at the table — especially when splitting among multiple people — is where most people reach for a calculator. The math works like this:
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 font-mono text-sm bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3">
              Tip Amount = Bill &times; Tip Percentage<br />
              Total Bill = Bill + Tip Amount<br />
              Per Person = Total Bill &divide; Number of People
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The round-up feature is particularly useful for cash situations. Rather than asking everyone to produce exact change, it rounds each person&apos;s share up to the nearest dollar. This means the server receives a slightly higher tip (typically a few extra cents per person), and no one needs to dig for coins. The calculator clearly shows both the exact per-person amount and the rounded-up version so your group can decide which to use.
            </p>
          </div>

          {/* Worked Example */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A group of 4 friends goes out for dinner. Their bill comes to <strong>$92.00</strong> before tip. The service was excellent, so they want to leave a 20% tip.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Tip amount: $92.00 &times; 0.20 = <strong>$18.40</strong>. Total bill: $92.00 + $18.40 = <strong>$110.40</strong>. Per person: $110.40 &divide; 4 = <strong>$27.60</strong> each. With the round-up feature enabled, each person pays <strong>$28.00</strong>, bringing the total collected to $112.00 — giving the server a $20.00 tip instead of $18.40, a small boost that is easy to manage with cash.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If one person is paying by card and wants to cover the full amount, they enter $112.00 on their card and each of the other three hands them $28 cash. The calculator makes these splits clear so there is no awkward math at the table and no one accidentally undertips.
            </p>
          </div>

          {/* Key Factors */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in Tip Calculation</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Tip Percentage:</strong> The percentage you choose directly sets the tip amount. Common benchmarks are 15% for adequate service, 18% for good service, 20% for excellent service, and 25%+ for exceptional or to support a favorite restaurant. There is no legal minimum, but below 15% is generally considered a poor tip for full-service dining.</li>
              <li><strong className="text-gray-900 dark:text-white">Pre-Tax vs. Post-Tax Bill:</strong> Tipping on pre-tax is technically correct by etiquette standards, but the difference is usually under a dollar on a typical meal. Most people simply tip on whatever total is printed on the check.</li>
              <li><strong className="text-gray-900 dark:text-white">Number of People:</strong> The more people splitting a bill, the more important it is to calculate carefully — small rounding errors multiply across the group. The calculator handles any group size from 1 to as many as you need.</li>
              <li><strong className="text-gray-900 dark:text-white">Automatic Gratuity:</strong> Many restaurants add 18–20% gratuity automatically for parties of 6 or more. Always scan your receipt before calculating a tip to avoid double-tipping. The line item is often labeled &ldquo;auto-gratuity&rdquo; or &ldquo;service charge.&rdquo;</li>
            </ul>
          </div>

          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333339" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
