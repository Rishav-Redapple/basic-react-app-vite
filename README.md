# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

#### This sample only exists`for this`src/create-routes.tsx` file

> i.e generating routes just like NextJS's app router

```tsx
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
```
