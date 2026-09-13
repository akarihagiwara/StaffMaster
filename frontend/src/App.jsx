import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import StaffListPage from "./pages/StaffListPage";
import StaffCreatePage from "./pages/StaffCreatePage";
import StaffEditPage from "./pages/StaffEditPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/staff" element={<StaffListPage />} />
          <Route path="/staff/new" element={<StaffCreatePage />} />
          <Route path="/staff/:staffId" element={<StaffEditPage />} />
          <Route path="/staff/:staffId/edit" element={<StaffEditPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
