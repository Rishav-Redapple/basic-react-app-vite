import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const routeModules = import.meta.glob("./routes/**/page.{jsx,tsx,js}");

export default function createRoutes() {
  const routes = [];
  for (const path in routeModules) {
    const ReactComponent = lazy(() => routeModules[path]() as never);
    const routePath = path.replace("./routes", "").replace("page.tsx", "");

    if (!routePath) continue;

    routes.push(
      <Route
        key={routePath}
        path={routePath == "/page" ? "/" : routePath}
        element={
          <Suspense fallback={<article>Loading...</article>}>
            <ReactComponent />
          </Suspense>
        }
      />
    );
  }
  return routes;
}
