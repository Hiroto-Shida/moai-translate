import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/moai_normal.png" />
        <meta
          property="og:image"
          content="https://moai-translate.vercel.app/api/ogp"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
