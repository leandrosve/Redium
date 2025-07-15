export type APISuccessfulResponse<T> = {
  data: T;
  hasError: false;
};

export type APIErrorResponse<T> = {
  data?: T;
  error: string;
  hasError: true;
};

export type APIResponse<T> = APIErrorResponse<T> | APISuccessfulResponse<T>;
