# Google Search Console Setup Guide

## Step 1: Create Google Search Console Account

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click "Add Property"
4. Enter your website URL (e.g., `https://yourdomain.com`)
5. Choose verification method (recommended: HTML tag)

## Step 2: Verify Your Website

### Option 1: HTML Tag (Recommended)
1. Copy the verification meta tag provided by Google
2. Add it to `app/layout.tsx` in the `<head>` section
3. Example:
```tsx
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

### Option 2: HTML File Upload
1. Download the HTML verification file
2. Place it in the `public` folder
3. It will be accessible at `https://yourdomain.com/google1234567890.html`

### Option 3: DNS Record
1. Add the TXT record to your domain's DNS settings
2. Wait for DNS propagation (can take up to 48 hours)

## Step 3: Submit Your Sitemap

1. After verification, go to "Sitemaps" in the left sidebar
2. Enter your sitemap URL: `https://yourdomain.com/sitemap.xml`
3. Click "Submit"
4. Google will start crawling your site

## Step 4: Monitor Your Site

### Important Sections to Check:

1. **Coverage**: See which pages are indexed
2. **Performance**: Track search impressions and clicks
3. **Enhancements**: Check for structured data issues
4. **Mobile Usability**: Ensure mobile-friendly pages

## Step 5: Request Indexing (Optional)

For faster indexing of new pages:
1. Go to "URL Inspection" tool
2. Enter a page URL
3. Click "Request Indexing"

## Important Notes

- It can take a few days to weeks for Google to fully index your site
- Make sure your `robots.txt` allows crawling (already configured)
- Check that your sitemap is accessible at `/sitemap.xml`
- Monitor for any crawl errors and fix them promptly

## Troubleshooting

### Sitemap Not Found
- Verify `app/sitemap.ts` exists and exports correctly
- Check that the route is accessible at `/sitemap.xml`
- Ensure your domain is correctly set in `sitemap.ts`

### Pages Not Indexing
- Check `robots.txt` allows crawling
- Verify pages have proper metadata
- Ensure pages are linked from other pages
- Use "URL Inspection" to check individual pages

### Verification Failed
- Double-check the meta tag is in the `<head>` section
- Clear your cache and check the live site
- Try an alternative verification method

## Next Steps After Setup

1. **Monitor Performance**: Check Search Console weekly
2. **Fix Errors**: Address any crawl or indexing errors
3. **Optimize**: Use performance data to improve SEO
4. **Submit Updates**: Resubmit sitemap after major changes

