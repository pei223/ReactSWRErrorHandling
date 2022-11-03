import useSWR, { SWRConfiguration } from "swr";
import { baseApi } from "../common";
import { UserInfo } from "./types";

const fetcher = (url: string): Promise<UserInfo> => {
  return baseApi.get(url).json();
};

export const useUserInfo = (options?: SWRConfiguration) => {
  const { data, error, mutate } = useSWR<UserInfo>(
    ["user-info"],
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
