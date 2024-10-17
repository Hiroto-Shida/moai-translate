import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const timestamp = new Date().getTime(); // 現在の時間をミリ秒単位で取得

  return (
    <Html lang="ja">
      <Head>
        <link rel="icon" href="/moai_normal.png" />
        <meta
          property="og:image"
          content={`https://moai-translate.vercel.app/api/ogp?${timestamp}`}
        />
        <meta
          http-equiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta http-equiv="Pragma" content="no-cache" />
        <meta http-equiv="Expires" content="0" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
