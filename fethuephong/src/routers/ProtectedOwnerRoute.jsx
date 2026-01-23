import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function PrivateOwnerRoute({ children }) {
  const { state } = useUser();
  const { user, isLoading } = state;

  // ⏳ Chờ restore xong
  if (isLoading) {
    return null; // hoặc spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role != 'owner') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default PrivateOwnerRoute;
