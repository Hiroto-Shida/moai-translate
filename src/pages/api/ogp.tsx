import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  const backgroundUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/ogp.jpg`;

  // TODO: 動的なOGP画像を生成する
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
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
