import { useEffect, useRef, useState } from "react";
import { ApiHookResult } from "./types";

/**
 * Add prevData to ApiHookResult
 * @param hookResult SWR hook result
 * @returns hookResult with prevData
 */
export const withPrevData = <T>(
  hookResult: ApiHookResult<T>
): ApiHookResult<T> & { prevData: T | undefined } => {
  const [prevData, setPrevData] = useState<T | undefined>(undefined);
  const prevDataRef = useRef<T | undefined>(undefined);
  useEffect(() => {
    setPrevData(prevDataRef.current);
    prevDataRef.current = hookResult.data;
  }, [hookResult.data]);
  return { ...hookResult, prevData };
};
