import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { state } = useUser();

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
