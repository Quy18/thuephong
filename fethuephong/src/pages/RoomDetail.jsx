import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./css/RoomDetail.css";

const RANDOM_IMAGES = Array.from({ length: 6 }).map(
  (_, i) => `https://picsum.photos/1200/800?random=${i + 20}`
);

function RoomDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  // ✅ luôn scroll về đầu khi vào trang
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

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === RANDOM_IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? RANDOM_IMAGES.length - 1 : prev - 1
    );
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
          {/* LEFT - IMAGE */}
          <div className="detail-left">
            <div className="image-slider">
              <img
                src={RANDOM_IMAGES[currentIndex]}
                alt="room"
                className="main-image"
              />

              <button className="nav-btn left" onClick={prevImage}>‹</button>
              <button className="nav-btn right" onClick={nextImage}>›</button>

              <div className="image-indicator">
                {currentIndex + 1}/{RANDOM_IMAGES.length}
              </div>
            </div>
          </div>

          {/* RIGHT - INFO */}
          <div className="detail-right">
            <div className="detail-info">
              <h2>Thông tin phòng</h2>
              <ul>
                <li>💰 Giá: <strong>{room.price} ₫ / tháng</strong></li>
                <li>📄 Hợp đồng: {room.contract_term}</li>
                <li>🏠 Trạng thái: {room.status}</li>
                <li>👤 Chủ phòng: {room.owner?.name || "Chưa cập nhật"}</li>
              </ul>
            </div>

            <div className="contact-box">
              <h3>Liên hệ chủ phòng</h3>
              <button className="chat-btn">💬 Nhắn tin (demo)</button>
              <p className="note">* Chức năng sẽ cập nhật sau</p>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="detail-description">
          <h2>Mô tả</h2>
          <p>
            Phòng sạch sẽ, rộng rãi, đầy đủ tiện nghi, khu vực an ninh,
            phù hợp sinh viên và người đi làm.
          </p>
        </div>

        {/* REVIEWS */}
        <div className="reviews">
          <h2>Đánh giá</h2>

          <div className="review-item">
            <strong>Nguyễn Văn A</strong>
            <p>Phòng sạch, chủ nhà dễ thương 👍</p>
          </div>

          <div className="review-item">
            <strong>Trần Thị B</strong>
            <p>Vị trí tốt, đi lại thuận tiện</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RoomDetail;
