import {
  ApiErrorResponseType,
  HiraganaResponse,
} from "@/types/ApiResponseType";
import axios, { AxiosError, AxiosResponse } from "axios";

/**
 * 漢字/カタカナ/英語からひらがなへの変換処理
 */
export const convertToHiragana = async (
  text: string,
  apiKey: string
): Promise<string | null> => {
  // TODO: 全体でaxiosを使う場合は、instanceを共通化したい
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  return axios
    .post(`${baseURL}/api/hiragana`, {
      text,
      apiKey,
    })
    .then((response: AxiosResponse<HiraganaResponse>) => {
      return response.data.converted;
    })
    .catch((error: AxiosError<ApiErrorResponseType>) => {
      // クライアントサイドの時はalertでエラーメッセージを表示
      if (typeof window !== "undefined") {
        alert(
          `APIエラーが発生しました\n${error.response?.data.error.message || ""}`
        );
      }
      return null;
    });
};
