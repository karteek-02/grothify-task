import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script defer src="https://unpkg.com/alpinejs@3.2.4/dist/cdn.min.js"></script>    
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
