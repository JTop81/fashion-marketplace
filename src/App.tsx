import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getCurrentUser } from "api/services/users";
import ErrorBoundary from "common/components/ErrorBoundary";
import { FormikTempPersist } from "common/components/FormikPersist/FormikTempPersist";
import Loading from "common/components/Loader";
import { withLDProvider } from "launchdarkly-react-client-sdk";
import { useAuthStore } from "setup/store/auth/authStore";

import { MyRoutes } from "./setup/router/myRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnMount: true,
    },
  },
});

const App = () => {
  const {
    isLoading,
    handleAuthentication,
    setUser,
    shouldHandleAuthentication,
  } = useAuthStore();

  useEffect(() => {
    const fetch = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    if (shouldHandleAuthentication) {
      handleAuthentication();
    } else {
      fetch();
    }
  }, [handleAuthentication, setUser, shouldHandleAuthentication]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <QueryClientProvider client={queryClient}>
          <FormikTempPersist />
          <ReactQueryDevtools initialIsOpen={false} />
          <MyRoutes />
        </QueryClientProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default withLDProvider({
  clientSideID: "674fae7b8e47f80c000ad68d",
  options: {
    bootstrap: "localStorage",
    diagnosticOptOut: true,
  },
})(App);
