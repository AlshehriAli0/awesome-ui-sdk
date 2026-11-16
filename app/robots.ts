import type { MetadataRoute } from 'next';
import { siteUrl } from '../website/src/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: process.env.VERCEL_ENV === 'preview' ? { userAgent: '*', disallow: '/' } : { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
