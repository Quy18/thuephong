import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { fetchRooms } from "../api/room";
import "./css/HomeBody.css";

function HomeBody() {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRooms(page);
  }, [page]);

  const loadRooms = async (page) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchRooms({
        page,
      });

      setRooms(data.data);
      setTotalPages(data.last_page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div className="home-body">
      <h2 className="home-title">Phòng đang cho thuê</h2>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error">{error}</p>}

      <div className="room-grid">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={{
              id: room.id,
              title: room.title,
              contract_term: room.contract_term,
              image: `https://picsum.photos/400/300?random=${room.id}`,
              price: room.price.toLocaleString("vi-VN"),
              address: `${room.district}, ${room.city}`,
              status: room.status,
            }}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={page === 1} onClick={handlePrev}>
          ◀ Trước
        </button>

        <span>
          Trang {page} / {totalPages}
        </span>

        <button disabled={page === totalPages} onClick={handleNext}>
          Sau ▶
        </button>
      </div>
    </div>
  );
}

export default HomeBody;
