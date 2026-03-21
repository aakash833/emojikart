# AdSense ads.txt File Setup

## ✅ ads.txt (route + public)

**Primary:** `app/ads.txt/route.ts` serves **`text/plain; charset=utf-8`** at **https://emojikart.com/ads.txt** so AdSense and other crawlers reliably detect the file (fixes many “Not found” cases).

**Backup:** `public/ads.txt` mirrors the same line if your host prefers static files.

---

## 📄 File Contents

```
google.com, pub-4360932072488893, DIRECT, f08c47fec0942fa0
```

### Format Explanation:
- **google.com** - Google's advertising system domain
- **pub-4360932072488893** - Your AdSense publisher ID
- **DIRECT** - Indicates direct relationship with Google
- **f08c47fec0942fa0** - Google's certification authority ID (standard for all AdSense accounts)

---

## 🔍 Verification Steps

1. **Deploy to Production**: Make sure the file is deployed to your live site
2. **Verify Accessibility**: Visit `https://emojikart.com/ads.txt` in your browser
3. **Check in AdSense**: 
   - Go to Google AdSense → Sites
   - The ads.txt status should update to "Found" within 24-48 hours
4. **Test Locally**: You can test locally at `http://localhost:3000/ads.txt` (if running dev server)

---

## 📝 Important Notes

- The file must be accessible at the root domain: `https://emojikart.com/ads.txt`
- Next.js automatically serves files from the `public` folder at the root URL
- Google AdSense crawls this file periodically (usually within 24-48 hours)
- The file must be plain text (no HTML, no formatting)
- Each line should follow the format: `domain, publisher_id, relationship, certification_authority_id`

---

## ✅ Next Steps

1. **Deploy**: Push the changes to your production server
2. **Verify**: Check that `https://emojikart.com/ads.txt` is accessible
3. **Wait**: Google AdSense will automatically detect it within 24-48 hours
4. **Monitor**: Check your AdSense dashboard for status updates

---

The ads.txt file is now ready and will be automatically served by Next.js! 🎉
