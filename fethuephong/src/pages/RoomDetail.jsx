import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import ChatModal from "../components/Chat/ChatModal";
import "./css/RoomDetail.css";
import { createConversation } from "../api/chat";

const BASE_IMAGE_URL = "http://localhost:8000/storage/";
const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=1976d2&color=fff";

function RoomDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { state: userState } = useUser();
  const user = userState.user;

  const [currentIndex, setCurrentIndex] = useState(0);

  // 👉 CHAT STATE
  const [openChat, setOpenChat] = useState(false);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  if (!state?.room) {
    return (
      <div className="room-detail">
        <p>Không tìm thấy dữ liệu phòng</p>
        <button onClick={() => navigate(-1)}>← Quay lại</button>
      </div>
    );
  }

  const { room } = state;

  // ====== IMAGES ======
  const images = useMemo(() => {
    if (room.images?.length) {
      return room.images.map(
        (img) => BASE_IMAGE_URL + img.image_path
      );
    }

    return Array.from({ length: 5 }).map(
      (_, i) => `https://picsum.photos/1200/800?random=${i}`
    );
  }, [room.images]);

  const nextImage = () => {
    setCurrentIndex((i) =>
      i === images.length - 1 ? 0 : i + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((i) =>
      i === 0 ? images.length - 1 : i - 1
    );
  };

  // ====== CHAT ======
  const handleClick = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để nhắn tin");
      return;
    }

    if (user.id === room.owner.id) {
      alert("Bạn là chủ phòng");
      return;
    }

    try {
      // const res = await createConversation({
      //   room_id: room.id,
      //   owner_id: room.owner.id,
      // });

      // 👉 LƯU CONVERSATION + MỞ MODAL
      // setConversation(res.conversation);
      setOpenChat(true);

    } catch (err) {
      console.error(err);
      alert(err.message || "Không thể tạo cuộc trò chuyện");
    }
  };

  return (
    <>
      <Header />

      <div className="room-detail">
        {/* HEADER */}
        <div className="detail-header">
          <button className="back-inline" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>

          <div className="header-text">
            <h1>{room.title}</h1>
            <p>{room.address}</p>
          </div>
        </div>

        {/* TOP */}
        <div className="detail-top">
          <div className="detail-left">
            <div className="image-slider">
              <img
                src={images[currentIndex]}
                alt="room"
                className="main-image"
              />

              {images.length > 1 && (
                <>
                  <button className="nav-btn left" onClick={prevImage}>
                    ‹
                  </button>
                  <button className="nav-btn right" onClick={nextImage}>
                    ›
                  </button>
                  <div className="image-indicator">
                    {currentIndex + 1}/{images.length}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="detail-right">
            <div className="detail-info">
              <h2>Thông tin phòng</h2>
              <ul>
                <li>💰 Giá: <strong>{room.price?.toLocaleString()} ₫</strong></li>
                <li>📄 Hợp đồng: {room.contract_term}</li>
                <li>🏠 Trạng thái: {room.status}</li>
                <li>👤 Chủ phòng: {room.owner?.name}</li>
              </ul>
            </div>

            <div className="contact-box">
              <h3>Liên hệ chủ phòng</h3>

              <img
                src={
                  room.owner?.avatar
                    ? BASE_IMAGE_URL + room.owner.avatar
                    : DEFAULT_AVATAR
                }
                alt="avatar"
                className="user-avatar"
              />

              <span className="user-name">{room.owner?.name}</span>

              <button className="chat-btn" onClick={handleClick}>
                💬 Nhắn tin
              </button>

              <p className="note">* Nhắn tin trực tiếp với chủ phòng</p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="detail-description">
          <h2>Mô tả</h2>
          <p>{room.description || "Chưa có mô tả chi tiết."}</p>
        </div>
      </div>

      {/* 🔥 CHAT MODAL */}
      {openChat && (
      <ChatModal
        onClose={() => setOpenChat(false)}
        conversation={conversation}
        room={room}
      />
    )}

    </>
  );
}

export default RoomDetail;
