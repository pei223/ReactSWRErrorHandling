import useSWR, { SWRConfiguration } from "swr";
import { baseApi } from "../common";
import { TodoList } from "./types";

const fetcher = (
  url: string,
  params: { page: number; limit: number }
): Promise<TodoList> => {
  return baseApi
    .get(url, {
      searchParams: params,
    })
    .json();
};

export const useTodos = (
  params: { page: number; limit: number },
  options?: SWRConfiguration
) => {
  const { data, error, mutate } = useSWR<TodoList>(
    ["todos", params],
    fetcher,
    options
  );

  return {
    data,
    loading: !error && !data,
    error,
    mutate,
  };
};
