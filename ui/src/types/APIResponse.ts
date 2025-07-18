export type APISuccessfulResponse<T> = {
  data: T;
  hasError: false;
  ok:true;
};

export type APIErrorResponse<T> = {
  data?: T;
  error: string;
  hasError: true;
  ok:false;
};

export type APIResponse<T> = APIErrorResponse<T> | APISuccessfulResponse<T>;
