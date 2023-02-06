import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
          <script src={`https://cdn.tiny.cloud/1/${`2phg9yfd8lhwsjoyhllpe2rf3vj2if34am04yf24a7ym7yld`}/tinymce/5/tinymce.min.js`} referrerPolicy="origin"></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
