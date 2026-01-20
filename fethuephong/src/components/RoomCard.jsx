import "./css/RoomCard.css";

const STATUS_TEXT = {
  available: "Còn trống",
  rented: "Đã thuê",
};

function RoomCard({ room }) {
  const isRented = room.status === "rented";

  return (
    <div className={`room-card ${isRented ? "disabled" : ""}`}>
      <div className="room-image-wrapper">
        <img
          src={room.image}
          alt={room.address}
          className="room-image"
        />

        <span className={`room-status ${room.status}`}>
          {STATUS_TEXT[room.status]}
        </span>
      </div>

      <div className="room-info">
        <p className="room-price">{room.price} đ / tháng</p>
        <p className="room-address">{room.address}</p>
      </div>
    </div>
  );
}

export default RoomCard;
