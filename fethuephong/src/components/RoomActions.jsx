function RoomActions({ status }) {
  return (
    <div className="room-actions">
      <button className="edit-btn">✏️ Sửa</button>

      {status !== "rented" && (
        <button className="delete-btn">🗑 Xóa</button>
      )}

      {status === "available" && (
        <button className="rent-btn">🔴 Đánh dấu đã thuê</button>
      )}

      {status === "rented" && (
        <button className="free-btn">🟢 Đánh dấu còn trống</button>
      )}
    </div>
  );
}

export default RoomActions;
