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
  { q: 'How much house can I afford on my salary?', a: 'A general rule is that your home price should be 2.5–3× your annual gross income. On a $100,000 salary, that is $250,000–$300,000. However, this varies based on your debts, down payment, interest rate, and local property taxes and insurance. Our home affordability calculator uses the 28/36 rule to give you a more precise estimate.' },
  { q: 'What is the 28/36 rule for mortgages?', a: 'The 28/36 rule states that your housing costs should not exceed 28% of your gross monthly income (front-end DTI), and all debt payments combined should not exceed 36% (back-end DTI). On a $100,000 salary ($8,333/month), 28% = $2,333 max housing payment and 36% = $3,000 max total debt payments.' },
  { q: 'How much should I put down on a house?', a: 'A 20% down payment eliminates PMI (private mortgage insurance) and gives you a lower interest rate. However, many buyers put down 3–10% through FHA loans (3.5% minimum), conventional loans (3% minimum), or VA loans (0% for veterans). A larger down payment means lower monthly payments and less total interest paid.' },
  { q: 'What is a debt-to-income ratio for a mortgage?', a: 'For mortgage qualification, lenders look at two DTI ratios: Front-end DTI (housing costs ÷ gross income) should be under 28%. Back-end DTI (all monthly debts ÷ gross income) should be under 36–43%. Most conventional loans require back-end DTI under 45%, while FHA loans allow up to 50% in some cases.' },
  { q: 'How do I save for a house down payment?', a: 'Set a specific savings target (typically 20% of your target home price plus 3–5% for closing costs). Open a dedicated high-yield savings account. Automate monthly transfers on payday. Look into first-time homebuyer programs in your state — many offer grants or low-interest loans for down payment assistance. Our savings calculator can help you plan your timeline.' },
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
              This home affordability calculator uses the industry-standard 28/36 debt-to-income rule to calculate the maximum home price you can comfortably afford. It accounts for your income, existing debts, down payment, interest rate, property taxes, and insurance to give you three scenarios: conservative (what you can comfortably afford), moderate (the lender standard), and aggressive (the maximum most lenders will approve). Use this as your starting point before talking to a lender.
            </p>
          </div>
          <div className="pb-10"><FAQ questions={faqs} /></div>
          <div className="pb-6"><AdBanner slot="3333333345" /></div>
        </div>
      </section>
      <Footer />
    </>
  )
}
