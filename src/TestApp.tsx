import React from "react";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import { SnackbarProvider, useSnackbar } from "notistack";
import { SWRConfig } from "swr";
import TestComponent from "./components/TestComponent";
import TestErrorFallback from "./TestErrorFallback";
import { HTTPError } from "ky";

const AppRouter = () => {
  const handleError = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <SWRConfig
      value={{
        onError: async (err) => {
          if (err instanceof HTTPError) {
            const res = await err.response.clone();
            if (res.status === 400) {
              enqueueSnackbar(`BadRequest: ${err.message}`, {
                variant: "error",
              });
              return;
            }
          }
          handleError(err);
        },
      }}
    >
      {/** ここにReact routerの設定など */}
      <TestComponent />
    </SWRConfig>
  );
};

function TestApp() {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      autoHideDuration={3000}
    >
      <ErrorBoundary FallbackComponent={TestErrorFallback}>
        <AppRouter />
      </ErrorBoundary>
    </SnackbarProvider>
  );
}

export default TestApp;
