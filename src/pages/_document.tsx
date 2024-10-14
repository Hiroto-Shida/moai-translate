import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <title>モアイ翻訳</title>
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
