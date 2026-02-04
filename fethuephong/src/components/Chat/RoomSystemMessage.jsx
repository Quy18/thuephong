function RoomSystemMessage({ room }) {
  return (
    <div className="room-system-message">
      <img src={room.image} alt="room" />
      <div>
        <strong>{room.title}</strong>
        <p>{room.price.toLocaleString()} ₫ / tháng</p>
        <small>{room.address}</small>
      </div>
    </div>
  );
}

export default RoomSystemMessage;
