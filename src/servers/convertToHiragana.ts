import {
  ApiErrorResponseType,
  HiraganaResponse,
} from "@/types/ApiResponseType";
import axios, { AxiosError, AxiosResponse } from "axios";

export const convertToHiragana = async (text: string): Promise<string> => {
  return axios
    .post("/api/hiragana", { text })
    .then((response: AxiosResponse<HiraganaResponse>) => {
      return response.data.converted;
    })
    .catch((error: AxiosError<ApiErrorResponseType>) => {
      return error.response?.data.error.message || "APIエラーが発生しました";
    });
};
