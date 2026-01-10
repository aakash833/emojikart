# Google AdSense Setup Guide

## Step 1: Create AdSense Account

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign in with your Google account
3. Click "Get Started"
4. Enter your website URL
5. Select your country/region
6. Choose your payment method

## Step 2: Add AdSense Code to Your Site

### Update AdSense Publisher ID

1. After approval, get your Publisher ID (format: `ca-pub-XXXXXXXXXX`)
2. Update the following files:

**File: `components/adsense-ad.tsx`**
```tsx
// Replace YOUR_PUBLISHER_ID with your actual Publisher ID
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
```

**File: `app/layout.tsx`**
Add the AdSense script in the `<head>` section:
```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

## Step 3: Create Ad Units

1. Go to AdSense Dashboard → Ads → Ad Units
2. Create ad units for each placement:

### Ad Unit 1: Top Banner
- Name: "Top Banner"
- Size: Responsive
- Ad Slot ID: Copy this ID
- Update in `components/ad-banner.tsx`: `adSlot: "YOUR_TOP_BANNER_SLOT_ID"`

### Ad Unit 2: Sidebar
- Name: "Sidebar"
- Size: 300x250 (Medium Rectangle) or Responsive
- Ad Slot ID: Copy this ID
- Update in `components/ad-banner.tsx`: `adSlot: "YOUR_SIDEBAR_SLOT_ID"`

### Ad Unit 3: Between Content
- Name: "Between Content"
- Size: Responsive
- Ad Slot ID: Copy this ID
- Update in `components/ad-banner.tsx`: `adSlot: "YOUR_BETWEEN_SLOT_ID"`

### Ad Unit 4: Bottom Sticky (Mobile)
- Name: "Bottom Sticky Mobile"
- Size: Responsive
- Ad Slot ID: Copy this ID
- Update in `components/ad-banner.tsx`: `adSlot: "YOUR_BOTTOM_STICKY_SLOT_ID"`

## Step 4: Ad Placement Locations

Ads are already integrated in the following locations:

1. **Top Banner** (`components/emoji-keyboard-client.tsx`):
   - Below header, above content
   - Full width, responsive

2. **Sidebar** (`components/emoji-keyboard-client.tsx`):
   - Desktop only (hidden on mobile)
   - Fixed position in left sidebar

3. **Between Content** (`components/emoji-keyboard-client.tsx`):
   - Appears every 50 emojis in the grid
   - Responsive, full width

4. **Bottom Sticky** (`components/emoji-keyboard-client.tsx`):
   - Mobile only (hidden on desktop)
   - Fixed at bottom of screen

## Step 5: AdSense Policies Compliance

### Required Pages (Already Created)
- ✅ `/privacy-policy` - Privacy Policy page
- ✅ `/terms-and-conditions` - Terms and Conditions page
- ✅ `/contact` - Contact page
- ✅ `/about` - About page

### Content Requirements
- ✅ Original, valuable content
- ✅ Easy navigation
- ✅ Mobile-friendly design
- ✅ Fast loading times

## Step 6: Wait for Approval

1. Submit your site for review
2. Approval typically takes 1-14 days
3. You'll receive an email when approved
4. Ads will start showing automatically after approval

## Step 7: Monitor Performance

1. Check AdSense Dashboard regularly
2. Monitor:
   - Revenue
   - Page views
   - Click-through rate (CTR)
   - Cost per click (CPC)

## Troubleshooting

### Ads Not Showing
- Check if your account is approved
- Verify Publisher ID is correct
- Check browser console for errors
- Ensure ad units are created and active

### Low Revenue
- Optimize ad placement (test different positions)
- Increase traffic (SEO, social media)
- Use Auto Ads (optional, can be enabled in AdSense)
- A/B test different ad sizes

### Policy Violations
- Review AdSense policies
- Fix any violations immediately
- Contact AdSense support if needed

## Best Practices

1. **Don't Click Your Own Ads** - This violates AdSense policies
2. **Don't Ask Users to Click Ads** - This is against policy
3. **Maintain Quality Content** - Keep adding valuable content
4. **Optimize for Mobile** - Most traffic is mobile
5. **Monitor Performance** - Adjust based on data

## Additional Resources

- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [AdSense Optimization Tips](https://support.google.com/adsense/topic/1319754)
