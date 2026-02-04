import "./css/RoomChatModal.css";

const BASE_IMAGE_URL = "http://localhost:8000/storage/";

function RoomChatModal({ open, onClose, room }) {
  if (!open || !room) return null;

  return (
    <div className="room-chat-overlay">
      <div className="room-chat-modal">
        {/* HEADER */}
        <div className="room-chat-header">
          <span>💬 Nhắn tin cho chủ phòng</span>
          <button onClick={onClose}>✖</button>
        </div>

        {/* ROOM INFO */}
        <div className="room-chat-room">
          <img
            src={
              room.images?.[0]
                ? BASE_IMAGE_URL + room.images[0].image_path
                : "https://picsum.photos/120/90"
            }
            alt="room"
          />

          <div className="room-chat-info">
            <h4>{room.title}</h4>
            <p className="price">
              {room.price?.toLocaleString()} ₫ / tháng
            </p>
            <small>{room.address}</small>
          </div>
        </div>

        {/* FIRST MESSAGE */}
        <div className="room-chat-input">
          <textarea
            placeholder="Nhập tin nhắn đầu tiên của bạn..."
            rows={3}
          />
          <button>Gửi tin nhắn</button>
        </div>
      </div>
    </div>
  );
}

export default RoomChatModal;
