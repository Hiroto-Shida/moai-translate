import {
  ApiErrorResponseType,
  HiraganaResponse,
} from "@/types/ApiResponseType";
import axios, { AxiosError, AxiosResponse } from "axios";

export const convertToHiragana = async (
  text: string
): Promise<string | null> => {
  return axios
    .post("/api/hiragana", { text })
    .then((response: AxiosResponse<HiraganaResponse>) => {
      return response.data.converted;
    })
    .catch((error: AxiosError<ApiErrorResponseType>) => {
      alert(`APIエラーが発生しました\n${error.response?.data.error.message}`);
      return null;
    });
};
