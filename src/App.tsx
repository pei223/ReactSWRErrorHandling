import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import First from './pages/First';
import Second from './pages/Second';
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { SWRConfig } from 'swr';

const AppRouter = () => {
  const handleError = useErrorHandler()
  const {enqueueSnackbar} = useSnackbar()
  return (
    <SWRConfig value={{
      onError: (err) => {
      }
    }}>
  <BrowserRouter>
    <Routes>
      <Route path="/first" element={<First />} />
      <Route path="/second" element={<Second />} />
    </Routes>
  </BrowserRouter>
  </SWRConfig>
  )
}




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <SnackbarProvider maxSnack={5} anchorOrigin={{horizontal: "center", vertical: "top"}} autoHideDuration={3000}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppRouter />
      </ErrorBoundary>
      </SnackbarProvider>
    </div>
  );
}

export default App;
