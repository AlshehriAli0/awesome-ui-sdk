import type { MetadataRoute } from 'next';
import { siteUrl } from '../website/src/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl }];
}
