import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./pages/Home";
import City from "./pages/City";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { ErrorBoundary } from "react-error-boundary";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <Error
      message={"Something went wrong"}
      onRetry={() => {
        // Reset the error boundary when retry is clicked
        resetErrorBoundary();
      }}
    />
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary fallbackRender={fallbackRender}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="/city/:cityName" element={<City />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </Router>
      <ReactQueryDevtools />
      <Analytics />
    </QueryClientProvider>
  );
}

export default App;
