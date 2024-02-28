import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipesPage from "./pages/RecipesPage";
import Login from "./pages/Login";
import Register from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
