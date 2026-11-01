import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import BaseLayout from "./pages/BaseLayout";
import Detail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={< Detail/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
