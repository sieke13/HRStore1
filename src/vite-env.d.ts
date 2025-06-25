/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MERCADOPAGO_PUBLIC_KEY: string
  readonly VITE_PAYPAL_CLIENT_ID: string
  readonly VITE_API_URL: string
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
