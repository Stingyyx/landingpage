# 📱 How to Add UniGO APK to Your Netlify Site

## 🚨 Issue: APK File Too Large for GitHub

**Problem:** Your `UniGO.apk` file is 103.86 MB, which exceeds GitHub's 100 MB limit.

**Solution:** Upload the APK directly to Netlify using their file management system.

---

## 🎯 Method 1: Netlify File Manager (Recommended)

### **Step-by-Step Instructions:**

1. **Go to your Netlify dashboard:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign in to your account

2. **Select your deployed site:**
   - Click on your site name

3. **Access the file browser:**
   - Go to **"Deploys"** tab
   - Click on your **latest deployment**
   - Look for **"Browse"** or **"View files"** button
   - This opens the file browser

4. **Upload your APK:**
   - In the file browser, look for an **"Upload"** button
   - Or simply **drag and drop** your `UniGO.apk` file
   - The file will be uploaded to your site's root directory

5. **Verify the upload:**
   - Your APK will be available at: `https://your-site-name.netlify.app/UniGO.apk`
   - Test the download link

---

## 🎯 Method 2: Netlify Drop Zone (Alternative)

### **If you can't find the file browser:**

1. **Go to your site's main page**
2. **Look for "Deploy manually" or "Drag and drop" area**
3. **Drag your `UniGO.apk` file** into the drop zone
4. **Netlify will create a new deployment** with your APK

---

## 🎯 Method 3: Netlify CLI (Advanced)

### **If you have Netlify CLI installed:**

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy your site with the APK
netlify deploy --prod --dir=dist
```

---

## 🔧 Method 4: External Hosting (Best for Large Files)

### **Host APK on external service:**

1. **Upload to Google Drive, Dropbox, or similar**
2. **Get a direct download link**
3. **Update your environment variable in Netlify:**
   - Go to **Site Settings** → **Environment Variables**
   - Add: `VITE_ANDROID_APK_URL` = `https://your-external-link.com/UniGO.apk`

---

## ✅ Verify Your APK is Working

### **Test the download:**

1. **Go to your live site**
2. **Click the Android download button**
3. **It should download the APK file**
4. **Test on your Android device**

### **Check the URL:**
- **Direct link:** `https://your-site-name.netlify.app/UniGO.apk`
- **Should download immediately**

---

## 🎯 Pro Tips

### **📱 For Mobile Testing:**
- **Share the link** with friends to test
- **Test on different Android devices**
- **Check download speed** and file integrity

### **🔧 If Upload Fails:**
- **Check file size** (should be under Netlify's limit)
- **Try renaming** to `UniGO.apk` (exact name)
- **Clear browser cache** and try again
- **Use external hosting** for very large files

### **🚀 Performance Tips:**
- **APK files are large** - expect slower downloads
- **Consider compression** if possible
- **Test on different networks** (WiFi vs mobile data)

---

## 🎉 Expected Results

After uploading your APK:

- ✅ **APK available for download**
- ✅ **Android download buttons work**
- ✅ **Users can install your app**
- ✅ **Epic landing page + functional downloads**
- ✅ **Campus app ready for the world!**

---

## 📞 Need Help?

### **If you're still having trouble:**

1. **Check Netlify's documentation:** [docs.netlify.com](https://docs.netlify.com)
2. **Contact Netlify support** through their dashboard
3. **Try the external hosting method** (Method 4)
4. **Use a file sharing service** like Google Drive

---

**Your epic UniGO landing page is ready - just add the APK and it's complete!** 🚀✨
