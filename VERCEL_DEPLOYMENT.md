# 🚀 Vercel Deployment Guide for Nujuum Arts

## Quick Deployment Steps

### 1. Prepare Your Repository
```bash
# Remove sensitive files from git tracking
git rm --cached .env.local
git rm --cached *.backup*
git rm --cached setup-firewall.ps1

# Add all files
git add .

# Commit your changes
git commit -m "Prepare for Vercel deployment"

# Push to GitHub
git push origin master
```

### 2. Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com) and sign in with GitHub**

2. **Import your repository:**
   - Click "New Project"
   - Select your "Arts" repository
   - Framework: Next.js (auto-detected)
   - Root Directory: `./`

3. **Add Environment Variables:**
   Go to Project Settings → Environment Variables and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://hpqumauzxfbfmmpfcutc.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [your_supabase_anon_key]
   SUPABASE_SERVICE_ROLE_KEY = [your_supabase_service_role_key]
   NODE_ENV = production
   NEXT_TELEMETRY_DISABLED = 1
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app
   - You'll get a URL like `https://arts-username.vercel.app`

### 3. Configure Your Domain (Optional)
- In Vercel dashboard → Domains
- Add your custom domain
- Update DNS records as instructed

### 4. Supabase Configuration

**Required Supabase Keys:**
1. **Project URL:** Already set (`https://hpqumauzxfbfmmpfcutc.supabase.co`)
2. **Anon Key:** Get from Supabase Dashboard → Settings → API
3. **Service Role Key:** Get from Supabase Dashboard → Settings → API

**Add to Vercel Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` 
- `SUPABASE_SERVICE_ROLE_KEY`

### 5. Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Test product display in shop
- [ ] Test cart functionality
- [ ] Test admin panel access
- [ ] Verify all images load
- [ ] Test responsive design
- [ ] Check console for errors

### 6. Maintenance Commands

**Redeploy from local changes:**
```bash
git add .
git commit -m "Update description"
git push origin master
# Vercel auto-deploys from GitHub
```

**Manual deploy:**
```bash
npm run build  # Test locally first
# Then push to GitHub
```

### 7. Troubleshooting

**Build errors:**
- Check Vercel build logs
- Ensure all dependencies in package.json
- Verify environment variables

**Database issues:**
- Verify Supabase keys in Vercel dashboard
- Check Supabase project status
- Test API endpoints

**Images not loading:**
- Ensure Unsplash URLs are accessible
- Check Next.js image optimization settings

### 8. Performance Optimization

- ✅ Image optimization enabled
- ✅ Static generation for pages
- ✅ API routes optimized
- ✅ Security headers configured
- ✅ Compression enabled

## Support

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)

---

🎨 **Your Nujuum Arts website will be live and accessible worldwide once deployed!**