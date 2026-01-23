import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import Chatbot from "../components/Chatbot";
import RoomDetail from "../pages/RoomDetail";
import Profile from "../pages/Profile";
import ProtectedOwnerRoute from "./ProtectedOwnerRoute";
import CreateRoomPage from "../pages/CreateRoomPage";
import OwnerRoomsPage from "../pages/OwnerRoomsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Khi vào domain -> tự động về login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/rooms/:id" element={
        <ProtectedRoute>
            <RoomDetail />
          </ProtectedRoute>
      } />

      {/* Route cần đăng nhập */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
            <Chatbot />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-room"
        element={
          <ProtectedOwnerRoute>
            <CreateRoomPage />
          </ProtectedOwnerRoute>
        }
      />

      <Route
        path="/owner-management-room"
        element={
          <OwnerRoomsPage>
            <CreateRoomPage />
          </OwnerRoomsPage>
        }
      />
    </Routes>
  );
}
