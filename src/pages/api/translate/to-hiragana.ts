import rateLimit from "@/lib/rateLimit";
import translateMoaiToHira from "@/utils/translateMoaiToHira";
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

  const { moaiLang, apiKey } = req.body;

  if (
    !moaiLang ||
    typeof moaiLang !== "string" ||
    apiKey !== process.env.MOAI_LANG_API_KEY
  ) {
    res.status(400).json({ message: "Bad Request" });
    return;
  }

  const textJp = await translateMoaiToHira(moaiLang);

  res.status(200).json({ jp: textJp });
}
