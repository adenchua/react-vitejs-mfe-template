import type { JSX } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";

// Reuses the same route tree as the './routes' expose (which already
// carries QueryClientProvider/ThemeProvider) and adds only the one thing
// that expose deliberately omits: BrowserRouter. Keeps a single source of
// truth instead of two independently-drifting provider trees.
function AppRoutes(): JSX.Element | null {
  return useRoutes(routes);
}

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
