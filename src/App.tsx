import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserStatus from "./pages/UserStatus";
import Navigation from "./components/Navigation";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/status" element={<UserStatus />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
