import "./css/OwnerRoomsPage.css";
import Header from "../components/Header";
import OwnerRoomCard from "../components/OwnerRoomCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMyRooms } from "../api/room";

function OwnerRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    fetchMyRooms(page)
      .then((res) => {
        setRooms(res.data);          // 👈 data
        setLastPage(res.last_page);  // 👈 tổng trang
      })
      .catch((err) => {
        console.error(err);
        alert("Không lấy được danh sách phòng");
      })
      .finally(() => setLoading(false));
  }, [page]);

  const filteredRooms =
    filter === "all"
      ? rooms
      : rooms.filter((room) => room.status === filter);

  return (
    <>
      <Header />

      <div className="owner-room-page">
        {/* HEADER */}
        <div className="page-header">
          <div className="left">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Quay lại
            </button>
            <h2>🏠 Quản lý phòng trọ</h2>
          </div>

          <button
            className="add-btn"
            onClick={() => navigate("/owner/rooms/create")}
          >
            ➕ Thêm phòng
          </button>
        </div>

        {/* FILTER */}
        <div className="filter-tabs">
          {[
            { key: "all", label: "Tất cả" },
            { key: "available", label: "Còn trống" },
            { key: "rented", label: "Đã thuê" },
            { key: "processing", label: "Chờ duyệt" },
          ].map((s) => (
            <button
              key={s.key}
              className={filter === s.key ? "active" : ""}
              onClick={() => setFilter(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <p className="loading-text">Đang tải danh sách phòng...</p>
        ) : (
          <>
            <div className="room-grid">
              {filteredRooms.map((room) => (
                <OwnerRoomCard key={room.id} room={room} />
              ))}

              {filteredRooms.length === 0 && (
                <p className="empty-text">Không có phòng nào</p>
              )}
            </div>

            {/* PAGINATION */}
            {lastPage > 1 && (
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  ←
                </button>

                <span>
                  Trang {page} / {lastPage}
                </span>

                <button
                  disabled={page === lastPage}
                  onClick={() => setPage(page + 1)}
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default OwnerRoomsPage;
