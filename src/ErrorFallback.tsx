import React from 'react'
import {ErrorBoundary, FallbackProps} from 'react-error-boundary'

const ErrorFallback: React.FC<FallbackProps> = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default ErrorFallback

