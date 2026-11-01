import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./views/Login";
import BaseLayout from "./views/BaseLayout";
import Home from "./views/Home";
import AddProduct from "./views/AddProduct";
import EditProduct from "./views/EditProduct";
import Category from "./views/Category";
import AddStaff from "./views/AddStaff";
import UploadImage from "./views/UploadImage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/upload/:id" element={<UploadImage />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/add-staff" element={<AddStaff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;