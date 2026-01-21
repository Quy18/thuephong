import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import "./css/Header.css";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=1976d2&color=fff";

function Header() {
  const { state, dispatch } = useUser();
  const user = state.user;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h3 className="logo">🏠 Tìm phòng trọ</h3>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Tìm theo khu vực, giá, loại phòng..."
          className="search-input"
        />
      </div>

      <div className="header-right">
        {user?.role === "owner" && (
          <Link to="/post-room" className="post-room">
            ➕ Đăng phòng
          </Link>
        )}

        {user && (
          <Link to="/profile" className="user-info">
            <img
              src={user.avatar || DEFAULT_AVATAR}
              alt="avatar"
              className="user-avatar"
            />
            <span className="user-name">{user.name}</span>
          </Link>
        )}

        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
