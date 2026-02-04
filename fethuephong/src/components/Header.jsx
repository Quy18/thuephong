import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./css/Header.css";
import ChatButton from "./Chat/ChatButton";
import ChatModal from "./Chat/ChatModal";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=1976d2&color=fff";
const BASE_IMAGE_URL = "http://localhost:8000/storage/";

function Header() {
  const [openChat, setOpenChat] = useState(false);

  const { state, dispatch } = useUser();
  const user = state.user;
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <h3 className="logo">🏠 Tìm phòng trọ</h3>
      </div>

      {/* SEARCH */}
      <div className="header-center">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Tìm kiếm thông minh ..."
            className="search-input"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button className="search-icon-btn" onClick={handleSearch}>
            🔍
          </button>
        </div>
      </div>

      <div className="header-right">
        {user?.role === "owner" && (
          <>
            <Link to="/create-room" className="post-room">
              ➕ 
            </Link>
            <Link to="/owner-management-room" className="manage-room">
              🏘️ 
            </Link>
          </>
        )}

        {user && <ChatButton onClick={() => setOpenChat(true)} />}

        {openChat && <ChatModal onClose={() => setOpenChat(false)} />}
          
        {user && (
          <Link to="/profile" className="user-info">
            <img
              src={user.avatar ? BASE_IMAGE_URL + user.avatar : DEFAULT_AVATAR}
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
