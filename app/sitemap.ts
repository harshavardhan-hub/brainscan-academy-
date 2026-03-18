import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
        url: 'https://brainscanacademy.com',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
    },
    {
        url: 'https://brainscanacademy.com/refer-and-earn',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
    },
  ]
}
