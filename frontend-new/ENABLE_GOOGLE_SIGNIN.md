# 🔐 Enable Google Sign-In in Clerk Dashboard

To show **Gmail/Google sign-in** button in your authentication interface, you need to enable it in your Clerk Dashboard.

## 📋 Steps to Enable Google Sign-In

### Step 1: Go to Clerk Dashboard
1. Visit **https://dashboard.clerk.com**
2. Sign in to your account
3. Select your application (Library Management System)

### Step 2: Navigate to Social Connections
1. In the left sidebar, click **"User & Authentication"**
2. Click **"Social Connections"** or **"OAuth"**
3. You'll see a list of available providers

### Step 3: Enable Google
1. Find **"Google"** in the list
2. Toggle the switch to **ON** (enable it)
3. Click **"Configure"** or **"Set up"**

### Step 4: Configure Google OAuth
1. You'll need to create a Google OAuth application:
   - Go to **https://console.cloud.google.com**
   - Create a new project (or use existing)
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs from Clerk

2. **OR** use Clerk's quick setup:
   - Clerk may provide a simplified setup
   - Follow the on-screen instructions
   - Copy the Client ID and Client Secret to Clerk

### Step 5: Save Configuration
1. Enter your Google OAuth credentials in Clerk
2. Click **"Save"** or **"Enable"**
3. Wait a few seconds for the changes to propagate

### Step 6: Test It!
1. Go back to your application
2. Click "Sign In"
3. You should now see a **"Continue with Google"** button! 🎉

---

## 🎯 What You'll See

After enabling Google, your sign-in page will show:

```
┌─────────────────────────────┐
│  Sign In                    │
│                             │
│  [Continue with Google] 🔵  │
│                             │
│  ──── or ────               │
│                             │
│  Email address              │
│  [________________]         │
│                             │
│  Password                   │
│  [________________]         │
│                             │
│  [Sign In]                  │
│                             │
│  Don't have an account?     │
│  Sign up                    │
└─────────────────────────────┘
```

---

## ✅ Quick Checklist

- [ ] Logged into Clerk Dashboard
- [ ] Selected correct application
- [ ] Went to "User & Authentication" → "Social Connections"
- [ ] Enabled Google provider
- [ ] Configured Google OAuth (if needed)
- [ ] Saved changes
- [ ] Tested in application

---

## 🆘 Troubleshooting

### Google Button Not Showing?
- **Wait 1-2 minutes** after enabling (propagation delay)
- **Refresh** your application page
- **Clear browser cache**
- Check if Google is actually enabled in Dashboard

### "Invalid Client" Error?
- Check your Google OAuth credentials
- Verify redirect URIs match Clerk's requirements
- Make sure Google+ API is enabled in Google Cloud Console

### Only Email Showing?
- Double-check Google is enabled in Clerk Dashboard
- Make sure you saved the configuration
- Try disabling and re-enabling Google

---

## 📚 Additional Providers

You can also enable:
- ✅ **GitHub** - For developers
- ✅ **Microsoft** - For Microsoft accounts
- ✅ **Apple** - For Apple ID
- ✅ **Facebook** - For Facebook accounts
- ✅ And many more!

Just follow the same steps for any provider you want to add.

---

## 💡 Pro Tip

**For Testing:**
- Use your personal Gmail account to test
- Make sure pop-ups are enabled (for OAuth redirect)
- Test in incognito mode to ensure it works for new users

---

**Once enabled, your users can sign in with just one click using their Google account! 🚀**

