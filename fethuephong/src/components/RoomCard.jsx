import "./css/RoomCard.css";
import { useNavigate } from "react-router-dom";

const STATUS_TEXT = {
  available: "Còn trống",
  rented: "Đã thuê",
};
const BASE_IMAGE_URL = "http://localhost:8000/storage/";
function RoomCard({ room }) {
  const isRented = room.status === "rented";
  const owner = room.owner;
  const images = room.images;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/rooms/${room.id}`, {
      state: { room },
    });
  };
  return (
    <div className={`room-card ${isRented ? "disabled" : ""}`} onClick={handleClick}>
      <div className="room-image-wrapper">
        <img
          src={
            images?.[0]?.image_path
              ? BASE_IMAGE_URL + images[0].image_path
              : room.image
          }
          alt={room.address}
          className="room-image"
        />

        {/* STATUS */}
        <span className={`room-status ${room.status}`}>
          {STATUS_TEXT[room.status]}
        </span>

        {/* OWNER BADGE */}
        {owner && (
          <div className="room-owner-badge">
            <img
              src={owner.avatar || "/default-avatar.png"}
              alt={owner.name}
              className="owner-avatar"
            />
            <span className="owner-name">{owner.name}</span>
          </div>
        )}
      </div>

      <div className="room-info">
        <p className="room-title">{room.title}</p>
        <p className="room-price">{room.price} đ / tháng</p>
        <p className="room-address">{room.address}</p>
        <p className="room-contract-term">
          ⏳ Hợp đồng: {room.contract_term}
        </p>
      </div>
    </div>
  );
}

export default RoomCard;
