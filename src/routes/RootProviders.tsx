import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../theme";

const queryClient = new QueryClient();

// Owns QueryClientProvider + ThemeProvider — deliberately NOT a
// BrowserRouter, since this route tree expects to be nested inside a
// host's own router once a host repo exists.
export function RootProviders(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default RootProviders;
