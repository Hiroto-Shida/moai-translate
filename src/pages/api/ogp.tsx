import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

// const loadLocalImage = async (path: string) => {
//   const fs = require("fs").promises;
//   const data = await fs.readFile(path);
//   return data;
// };

export default async function handler() {
  // NOTE: テキストをパラメータで指定することで動的な文章の表示が行える
  // const { searchParams } = new URL(req.url);
  // const text = searchParams.get("text");
  // const imagePath = await loadLocalImage(`${process.env.NEXT_PUBLIC_VERCEL_URL}/ogp_background.jpg`);

  const backgroundUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/ogp_background.jpg`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* 背景画像 */}
        <img
          src={backgroundUrl}
          alt="Background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        {/* テキスト */}
        <div
          style={{
            color: "white",
            fontSize: "48px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
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
