# 🔐 Clerk Authentication Setup Guide

This application now uses **Clerk** for authentication instead of the traditional username/password system. Follow these steps to get Clerk working with your Library Management System.

## 📋 Prerequisites

- A Clerk account (free tier available)
- Internet connection for the application to communicate with Clerk

## 🚀 Setup Steps

### Step 1: Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Click "Get Started for Free"
3. Sign up with your email or GitHub account

### Step 2: Create a New Application

1. Once logged in, click "Create Application"
2. Choose your application name (e.g., "Library Management System")
3. Select your preferred sign-in methods:
   - ✅ **Email** (recommended)
   - ✅ **Google** (optional, for easy sign-in)
   - ✅ **GitHub** (optional, for developers)
   - Other options as needed
4. Click "Create Application"

### Step 3: Get Your Publishable Key

1. In your Clerk Dashboard, go to **"API Keys"** section
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Keep this key safe - you'll need it next

### Step 4: Add Your Publishable Key

You have **two options** to add your Clerk Publishable Key:

#### Option A: Add to HTML (Recommended)
Open `frontend-new/index.html` and find this line:

```html
<script
    async
    crossorigin="anonymous"
    data-clerk-publishable-key=""
    src="https://accounts.clerk.com/npm/@clerk/clerk-js@latest/dist/clerk.browser.js"
    type="text/javascript"
></script>
```

Replace the empty `data-clerk-publishable-key=""` with your key:

```html
data-clerk-publishable-key="pk_test_YOUR_ACTUAL_KEY_HERE"
```

#### Option B: Add to Config File
Open `frontend-new/scripts/clerk-config.js` and update:

```javascript
const ClerkConfig = {
    PUBLISHABLE_KEY: 'pk_test_YOUR_ACTUAL_KEY_HERE',
    // ... rest of the config
};
```

### Step 5: Test Your Setup

1. Open `frontend-new/index.html` in your browser
2. Navigate to the Sign In page
3. You should see the Clerk authentication form
4. Try creating an account or signing in

## 🎨 Clerk Features Included

### ✅ What Works Out of the Box

- **Email/Password Authentication**
- **Social Sign-In** (Google, GitHub, etc.)
- **Password Reset** - Built into Clerk
- **Email Verification** - Automatic
- **User Profile Management** - Via Clerk Dashboard
- **Session Management** - Automatic

### 🛠️ Admin Role Management

By default, all users who sign up are **members**. To make someone an admin:

#### Method 1: Using Keyboard Shortcut (Development)
1. Sign in to the application
2. Press `Ctrl + Shift + A` to toggle admin role
3. Refresh the page

#### Method 2: Using Clerk Dashboard (Production)
1. Go to your Clerk Dashboard
2. Navigate to **Users**
3. Click on a user
4. Go to **Public Metadata** section
5. Add: `{ "role": "admin" }`
6. Save changes

## 🔧 Customization Options

### Change Appearance

Edit `frontend-new/scripts/clerk-config.js`:

```javascript
appearance: {
    variables: {
        colorPrimary: '#4545b9',      // Your primary color
        borderRadius: '12px',          // Border radius
        fontFamily: 'Poppins, sans-serif'
    }
}
```

### Configure Sign-In Options

In your Clerk Dashboard:
1. Go to **User & Authentication** → **Email, Phone, Username**
2. Enable/disable authentication methods
3. Configure password requirements
4. Set up social connections

## 📱 Features

### For Users:
- ✅ Sign up with email or social accounts
- ✅ Secure password reset
- ✅ Email verification
- ✅ Profile management
- ✅ Browse and borrow books
- ✅ Track borrowed books in "My Books"

### For Admins:
- ✅ All user features
- ✅ Access to admin dashboard
- ✅ Manage users (via Clerk Dashboard)
- ✅ View analytics
- ✅ Book management

## 🐛 Troubleshooting

### Issue: "Authentication Service Unavailable"

**Causes:**
- No Publishable Key added
- Wrong Publishable Key
- No internet connection
- Clerk SDK not loading

**Solutions:**
1. Verify your Publishable Key is correct
2. Check your internet connection
3. Check browser console for errors
4. Try clearing browser cache

### Issue: Can't Access Admin Dashboard

**Solution:**
- Press `Ctrl + Shift + A` after signing in (development)
- Or add admin role via Clerk Dashboard (production)

### Issue: Clerk Form Not Showing

**Solutions:**
1. Wait 2-3 seconds for Clerk to load
2. Check if you're blocking third-party scripts
3. Verify Clerk SDK script is loading (check Network tab)
4. Try disabling browser extensions

## 🔒 Security Features

Clerk provides enterprise-level security:

- ✅ **Automatic HTTPS** encryption
- ✅ **Session management** with JWT tokens
- ✅ **CSRF protection**
- ✅ **Rate limiting** on authentication attempts
- ✅ **Bot detection** and prevention
- ✅ **Passwordless authentication** options
- ✅ **Multi-factor authentication** (MFA) support

## 📚 Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk JavaScript SDK](https://clerk.com/docs/references/javascript/overview)
- [Clerk Dashboard](https://dashboard.clerk.com)
- [Clerk Community](https://discord.com/invite/clerk)

## 💡 Tips

1. **Development vs Production**: Use `pk_test_` keys for development and `pk_live_` for production
2. **Custom Domains**: Configure custom domains in Clerk Dashboard for branded sign-in
3. **Webhooks**: Set up webhooks to sync user data with your backend
4. **Analytics**: Use Clerk Dashboard to view sign-in analytics

## 🎯 Next Steps

After setting up Clerk:

1. ✅ Test sign-up flow
2. ✅ Test sign-in flow
3. ✅ Try password reset
4. ✅ Test social sign-in (if enabled)
5. ✅ Toggle admin role and test dashboard access
6. ✅ Customize appearance to match your brand

---

**Need Help?** 
- Check the browser console for error messages
- Review Clerk Dashboard for configuration issues
- Refer to [Clerk Documentation](https://clerk.com/docs)

**Made with ❤️ using Clerk Authentication**

