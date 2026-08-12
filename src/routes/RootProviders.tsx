import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, CssBaseline } from "@mui/material";
// Self-hosted, offline — no runtime dependency on a font CDN. MUI's default
// typography uses these four weights; import here (not main.tsx) so both
// federation exposes that render this theme (./App, ./routes) get the font,
// not just the standalone entry.
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
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
