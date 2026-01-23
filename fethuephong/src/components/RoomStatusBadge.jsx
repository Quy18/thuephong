const STATUS_META = {
  available: { label: "Còn trống", color: "green" },
  rented: { label: "Đã thuê", color: "red" },
  processing: { label: "Chờ duyệt", color: "orange" },
};

function RoomStatusBadge({ status }) {
  const meta = STATUS_META[status];

  return (
    <span className={`status-badge ${meta.color}`}>
      {meta.label}
    </span>
  );
}

export default RoomStatusBadge;
