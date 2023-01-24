import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "bootstrap/dist/css/bootstrap.min.css"; /* bootstrap style for header */
import { SSRProvider } from 'react-bootstrap';
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Head>
        <title>Nijika Computers</title>
      </Head>
      <Component {...pageProps} />
    </SSRProvider>
  )
}
