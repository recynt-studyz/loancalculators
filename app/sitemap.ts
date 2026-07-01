import type { MetadataRoute } from 'next'

const BASE = 'https://loancalculators.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                          lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/loan`,                lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/auto-loan`,           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/student-loan`,        lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/compound-interest`,   lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/salary`,              lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/retirement`,          lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/tip`,                 lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/sales-tax`,           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/credit-card`,         lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/savings`,             lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/refinance`,           lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/affordability`,       lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/dti`,                 lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/paycheck`,            lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/privacy`,             lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/about`,               lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
