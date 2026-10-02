import {Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Login from "./pages/login.jsx";
import Dashboard from "./pages/AdminDashboard.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import StaffDashboard from "./pages/StaffDashboard.jsx";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />
        
        {/* Add more routes here */}
        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff-dashboard"
        element={
          <ProtectedRoute>
            <StaffDashboard />
          </ProtectedRoute>
        }
      />
      </Routes>
  );
}

export default App;