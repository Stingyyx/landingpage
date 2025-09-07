/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ANDROID_APK_URL?: string
  readonly VITE_APPLE_STORE_URL?: string
  readonly VITE_SITE_NAME?: string
  readonly VITE_SITE_DESCRIPTION?: string
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_DEBUG_MODE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}