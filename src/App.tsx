import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodosPage from "./pages/Todos";
import Home from "./pages/Home";
import { ErrorBoundary, useErrorHandler } from "react-error-boundary";
import ErrorFallback from "./ErrorFallback";
import { SnackbarProvider, useSnackbar } from "notistack";
import { SWRConfig } from "swr";
import { isApiErrorRes, isHTTPError } from "./api/errors";

const AppRouter = () => {
  const handleError = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  return (
    <SWRConfig
      value={{
        onError: async (err) => {
          if (isHTTPError(err)) {
            const res = await err.response.clone();
            const resJson = await res.json();
            if (isApiErrorRes(resJson) && res.status === 400) {
              enqueueSnackbar(`BadRequest: ${resJson.message}`, {
                variant: "error",
              });
              return;
            }
          }
          handleError(err);
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  );
};

function App() {
  return (
    <div className="App">
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        autoHideDuration={3000}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRouter />
        </ErrorBoundary>
      </SnackbarProvider>
    </div>
  );
}

export default App;
