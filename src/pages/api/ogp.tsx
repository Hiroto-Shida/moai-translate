import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  // NOTE: テキストをパラメータで指定することで動的な文章の表示が行える
  // const { searchParams } = new URL(req.url);
  // const text = searchParams.get("text");

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_VERCEL_URL}/ogp_background.jpg)`,
          backgroundSize: "100% 100%",
          height: "100%",
          width: "100%",
          display: "flex",
          padding: "0 120px",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: 40,
            color: "black",
            width: "100%",
            height: "100%",
            padding: "50px 200px",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          モアイ翻訳
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
