import type { RouteObject } from "react-router-dom";
import { RootProviders } from "./RootProviders";
import { ExamplePage } from "../pages/ExamplePage";

export const routes: RouteObject[] = [
  {
    element: <RootProviders />,
    children: [{ path: "/", element: <ExamplePage /> }],
  },
];

export default routes;
