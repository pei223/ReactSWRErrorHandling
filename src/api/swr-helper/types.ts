import { KeyedMutator } from "swr";

export type ApiHookResult<ResType> = {
  data?: ResType;
  loading: boolean;
  error?: Error;
  mutate: KeyedMutator<ResType>;
};
