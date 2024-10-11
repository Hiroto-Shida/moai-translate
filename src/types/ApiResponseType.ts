export type ApiResponseType<T> = {
  data?: T;
  error?: ApiErrorResponseType;
};

export type HiraganaResponse = {
  request_id: string;
  output_type: string;
  converted: string;
};

export type ApiErrorResponseType = {
  error: {
    code: number;
    message: string;
  };
};
