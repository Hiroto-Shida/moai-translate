import rateLimit from "@/lib/rateLimit";
import { convertToHiragana } from "@/servers/convertToHiragana";
import translateHiraToMoai from "@/utils/translateHiraToMoai";
import { NextApiRequest, NextApiResponse } from "next";

const limiter = rateLimit({
  interval: 60 * 1000, // 1分間
  uniqueTokenPerInterval: 100, // 1分間に最大100ユーザー
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  try {
    await limiter.check(res, 10, clientIp as string); // 同じIPから1分間に最大10リクエスト
  } catch {
    res.status(429).json({ error: "Rate limit exceeded" });
  }

  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { jp, apiKey } = req.body;

  if (
    !jp ||
    typeof jp !== "string" ||
    apiKey !== process.env.MOAI_LANG_API_KEY
  ) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  // 日本語をひらがなに変換する
  const hiragana = await convertToHiragana(
    jp,
    process.env.GOO_LAB_API_KEY || ""
  );

  if (!hiragana) {
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }

  // ひらがなをモアイ語に変換する
  const moaiLang = await translateHiraToMoai(hiragana);

  res.status(200).json({ moaiLang: moaiLang });
}
