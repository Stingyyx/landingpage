# 📱 UniGO APK Download Instructions

## 🚀 For Developers/Deployers

The `UniGO.apk` file (103.86 MB) exceeds GitHub's 100 MB file size limit and has been excluded from this repository.

### 📋 To include the APK file in your deployment:

#### Option 1: Manual Upload (Recommended)
1. **Download the APK** from your development environment
2. **Place it in** `public/UniGO.apk` 
3. **Build and deploy** your site

#### Option 2: External Hosting
1. **Upload APK to** a file hosting service (Google Drive, Dropbox, etc.)
2. **Update the download link** in `src/LandingPage.tsx`:
   ```jsx
   <motion.a
     href="YOUR_EXTERNAL_APK_URL"
     // ... other props
   >
   ```

#### Option 3: Netlify File Upload
1. **Deploy to Netlify** without the APK
2. **Upload APK** via Netlify's file manager
3. **Update the link** to point to the Netlify-hosted APK

### 🔗 Current Download Link
The landing page currently points to `/UniGO.apk` which will work once the file is placed in the `public` directory during deployment.

### 📦 File Details
- **Filename:** UniGO.apk
- **Size:** 103.86 MB
- **Type:** Android Application Package
- **Purpose:** Direct download for Android users

---

**Note:** The APK file is essential for the Android download functionality. Make sure to include it in your deployment for the complete user experience.
