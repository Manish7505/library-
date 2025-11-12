# GitHub Setup Guide

## ✅ Completed Steps
- ✅ README.md removed
- ✅ .gitignore created
- ✅ All changes committed locally
- ⚠️ Need to update remote URL for your GitHub account

## Current Status
Your repository is currently pointing to: `iampranavdhar/Library-Management-System-MERN.git`

You need to create your own repository and update the remote URL.

## Step-by-Step Instructions

### Step 1: Create Repository on GitHub
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Repository name: `Library-Management-System-MERN`
4. Description: "Full-stack Library Management System built with MERN stack"
5. Choose **Public** or **Private**
6. **Important**: Do NOT initialize with README, .gitignore, or license (you already have these)
7. Click "Create repository"

### Step 2: Update Remote URL
Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/Library-Management-System-MERN.git
```

**Example:**
```bash
git remote set-url origin https://github.com/harshit-rohila/Library-Management-System-MERN.git
```

### Step 3: Verify Remote URL
```bash
git remote -v
```

You should see your repository URL.

### Step 4: Push to GitHub
```bash
git push -u origin master
```

## Authentication

### If You Get Authentication Errors:

**Option A: Use Personal Access Token (Recommended)**
1. Go to GitHub → Your Profile → Settings
2. Developer settings → Personal access tokens → Tokens (classic)
3. Click "Generate new token (classic)"
4. Give it a name: "Library Management System"
5. Select scopes: Check `repo` (all repo permissions)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)
8. When pushing, use:
   - Username: Your GitHub username
   - Password: The token you just copied

**Option B: Use SSH (Alternative)**
1. Generate SSH key (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
2. Add SSH key to GitHub (Settings → SSH and GPG keys)
3. Update remote to SSH:
   ```bash
   git remote set-url origin git@github.com:YOUR_USERNAME/Library-Management-System-MERN.git
   ```
4. Push:
   ```bash
   git push -u origin master
   ```

## Quick Commands Reference

```bash
# Check current remote
git remote -v

# Update remote URL
git remote set-url origin https://github.com/YOUR_USERNAME/Library-Management-System-MERN.git

# Push to GitHub
git push -u origin master

# If you need to force push (use with caution)
git push -u origin master --force
```

## Troubleshooting

### Error: Permission denied
- Make sure you've updated the remote URL to your repository
- Check that you're authenticated (use Personal Access Token)

### Error: Repository not found
- Verify the repository exists on GitHub
- Check that the repository name matches exactly
- Ensure you have access to the repository

### Error: Authentication failed
- Use Personal Access Token instead of password
- Make sure token has `repo` permissions
- Check if token has expired

## After Pushing

Once successfully pushed, you can:
- View your repository at: `https://github.com/YOUR_USERNAME/Library-Management-System-MERN`
- Share the repository link
- Continue making changes and pushing updates

## Future Updates

To push future changes:
```bash
git add .
git commit -m "Your commit message"
git push origin master
```

---

**Need Help?** Check GitHub's documentation: https://docs.github.com/en/get-started
