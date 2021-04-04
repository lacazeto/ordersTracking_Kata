export interface AxiosResponse<T> {
  data: {
    [K in keyof T]: T[K];
  };
}
