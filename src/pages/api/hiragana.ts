import {
  ApiErrorResponseType,
  HiraganaResponse,
} from "@/types/ApiResponseType";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const client: AxiosInstance = axios.create({
  baseURL: "https://labs.goo.ne.jp/api/hiragana",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, apiKey } = req.body;

  if (req.method !== "POST") {
    res
      .status(405)
      .json({ error: { code: 405, message: "Method Not Allowed" } });
    return;
  }

  if (!text || apiKey !== process.env.GOO_LAB_API_KEY) {
    res.status(400).json({ error: { code: 400, message: "Bad Request" } });
    return;
  }

  client
    .post(
      `https://labs.goo.ne.jp/api/hiragana?app_id=${apiKey}`,
      JSON.stringify({
        app_id: apiKey,
        sentence: text,
        output_type: "hiragana",
      })
    )
    .then((response: AxiosResponse<HiraganaResponse>) => {
      res.status(200).json(response.data);
    })
    .catch((error: AxiosError<ApiErrorResponseType>) => {
      res.status(500).json(error?.response?.data);
    });
}
