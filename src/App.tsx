import { BrowserRouter, Routes } from "react-router-dom";
import createRoutes from "./create-routes";
import Nav from "./nav";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>{createRoutes()}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
