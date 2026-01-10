# Deployment Guide for Emoji Keyboard

## Prerequisites

1. **Domain**: You need a domain name (e.g., emojikeyboard.com)
2. **Hosting**: Deploy to Vercel, Netlify, or any Next.js-compatible hosting
3. **Google AdSense Account**: Sign up at https://www.google.com/adsense/

## Step 1: Update Domain References

Replace all instances of `yourdomain.com` with your actual domain in:

- `app/layout.tsx` - Update `metadataBase` and all URLs
- `app/sitemap.ts` - Update `baseUrl`
- `app/robots.ts` - Update `baseUrl`
- `components/structured-data.tsx` - Update `url` and `urlTemplate`
- `app/category/[slug]/page.tsx` - Update canonical URLs in metadata

## Step 2: Google AdSense Setup

1. **Sign up for AdSense**:
   - Go to https://www.google.com/adsense/
   - Create an account and get your Publisher ID (format: `ca-pub-XXXXXXXXXX`)

2. **Update AdSense Code**:
   - Replace `YOUR_PUBLISHER_ID` in:
     - `app/page.tsx` (2 instances)
     - `components/emoji-category-page.tsx` (1 instance)
   - Replace `YOUR_AD_SLOT_ID` with your actual ad slot IDs

3. **Ad Placement**:
   - Top banner: 728x90 (leaderboard)
   - Bottom banner: 728x90 (leaderboard)
   - You can add more ad units as needed

## Step 3: Google Search Console

1. **Verify Ownership**:
   - Add your domain to Google Search Console
   - Update `app/layout.tsx` with your verification code:
     ```typescript
     verification: {
       google: "your-google-verification-code",
     },
     ```

2. **Submit Sitemap**:
   - Submit `https://yourdomain.com/sitemap.xml` to Google Search Console

## Step 4: Create OG Image

Create an Open Graph image (`public/og-image.png`):
- Size: 1200x630 pixels
- Should include your logo and "Emoji Keyboard" text
- This is used for social media sharing

## Step 5: Environment Variables (if needed)

If you need any environment variables, create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Step 6: Deploy to Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Configure Domain**:
   - Go to Vercel dashboard
   - Add your custom domain
   - Update DNS records as instructed

## Step 7: Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Add Environment Variables** in Netlify dashboard

## Step 8: Post-Deployment Checklist

- [ ] Update all domain references
- [ ] Add Google AdSense Publisher ID
- [ ] Add Google Search Console verification
- [ ] Create and upload OG image
- [ ] Test all category pages
- [ ] Verify sitemap is accessible
- [ ] Test emoji copying functionality
- [ ] Test search functionality
- [ ] Verify AdSense ads are showing
- [ ] Test on mobile devices
- [ ] Check page load speed
- [ ] Verify SEO metadata

## Step 9: SEO Optimization

1. **Submit to Search Engines**:
   - Google Search Console
   - Bing Webmaster Tools

2. **Monitor Performance**:
   - Use Google Analytics (optional)
   - Monitor Core Web Vitals
   - Check search rankings

## Step 10: AdSense Approval

1. **Wait for Approval**: Google typically takes 1-2 weeks
2. **Ensure Content Quality**: Make sure you have enough content
3. **Follow AdSense Policies**: No click fraud, quality content, etc.

## Additional Notes

- The app uses Next.js 16 with App Router
- All pages are statically generated for better performance
- Category pages are pre-rendered for SEO
- Haptic feedback works on supported devices
- Dark mode is fully functional
- Search uses fuzzy matching for better results

## Support

For issues or questions:
- Check Next.js documentation
- Check Google AdSense help center
- Review Next.js deployment guides

