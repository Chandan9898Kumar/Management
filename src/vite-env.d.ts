/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PORT: string
    // add more env variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }