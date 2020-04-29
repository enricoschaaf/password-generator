import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full">
        <Head>
          <meta name="description" content="Password Generator" />
          <link
            rel="preload"
            href="https://rsms.me/inter/font-files/Inter.var.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body className="text-gray-900 bg-gray-100 h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
