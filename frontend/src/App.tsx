import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Loyout"
import HomePage from "./pages/HomePage"
import LoginPages from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPages />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
  }

export default App
