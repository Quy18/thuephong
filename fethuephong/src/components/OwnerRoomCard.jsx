import RoomStatusBadge from "./RoomStatusBadge";
import RoomActions from "./RoomActions";
import "./css/OwnerRoomCard.css";

const BASE_IMAGE_URL = "http://localhost:8000/storage/";

function OwnerRoomCard({ room }) {
  const thumbnail =
    room.images && room.images.length > 0
      ? BASE_IMAGE_URL + room.images[0].image_path
      : `https://picsum.photos/400/300?random=${room.id}`;

  return (
    <div className="owner-room-card">
      {/* IMAGE */}
      <div className="room-thumb">
        <img src={thumbnail} alt={room.title} />
        <RoomStatusBadge status={room.status} />
      </div>

      {/* INFO */}
      <div className="room-info">
        <h4 className="room-title">{room.title}</h4>

        <p className="price">
          💰 {room.price.toLocaleString()} đ / tháng
        </p>

        <p className="meta">
          📐 {room.area} m² · 📍 {room.district}, {room.city}
        </p>

        <RoomActions room={room} />
      </div>
    </div>
  );
}

export default OwnerRoomCard;
