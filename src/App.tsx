import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipesPage from "./pages/RecipesPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Admin from "./pages/Admin";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/welcome" element={<WelcomePage/>}/>
        <Route path="/userPage" element={<RecipesPage  />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
