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
  const apiToken = process.env.GOO_LAB_API_KEY || "";
  const { text } = req.body;

  client
    .post(
      `https://labs.goo.ne.jp/api/hiragana?app_id=${apiToken}`,
      JSON.stringify({
        app_id: apiToken,
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
