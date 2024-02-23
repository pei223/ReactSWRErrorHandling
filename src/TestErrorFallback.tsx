import React from "react";
import { FallbackProps } from "react-error-boundary";

const TestErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div>
      <h1>Error</h1>
      <p>message: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default TestErrorFallback;
