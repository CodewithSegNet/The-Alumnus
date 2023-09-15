'use client'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "tw-elements-react/dist/css/tw-elements-react.min.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
