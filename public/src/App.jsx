import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import BaseLayout from "./pages/BaseLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/detail/:id" element={< />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
