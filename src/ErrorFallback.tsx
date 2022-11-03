import React, { useEffect, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import { isApiErrorRes, isHTTPError } from "./api/errors";
import { ErrorRes } from "./api/errors/types";

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const [errorRes, setErrorRes] = useState<ErrorRes | null>(null);
  useEffect(() => {
    const getErrorRes = async () => {
      if (!isHTTPError(error)) {
        return;
      }
      const resJson = await error.response.json();
      if (!isApiErrorRes(resJson)) {
        return;
      }
      setErrorRes(resJson);
    };
    getErrorRes();
  });
  return (
    <div>
      <h1>Error</h1>
      {errorRes !== null ? (
        <>
          <p>message: {errorRes.message}</p>
          <p>detail: {errorRes.detail}</p>
        </>
      ) : (
        <p>message: {error.message}</p>
      )}
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
