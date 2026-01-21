import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import SearchFilter from "./SearchFilter";
import { fetchRooms } from "../api/room";
import "./css/HomeBody.css";

function HomeBody() {
  const [rooms, setRooms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRooms(page, filters);
  }, [page, filters]);

  const loadRooms = async (page, filters) => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchRooms({
        page,
        ...filters,
      });

      setRooms(data.data);
      setTotalPages(data.last_page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 SEARCH
  const handleSearch = (newFilters) => {
    setPage(1);           // reset về trang 1 khi search
    setFilters(newFilters);
  };

  return (
    <div className="home-body">
      <h2 className="home-title">Phòng đang cho thuê</h2>

      <SearchFilter onSearch={handleSearch} />

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className="error">{error}</p>}

      <div className="room-grid">
        {rooms.length === 0 && !loading && (
          <p>Không tìm thấy phòng phù hợp</p>
        )}

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
              owner: room.owner,
            }}
          />
        ))}
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            ◀ Trang trước
          </button>

          <span>
            Trang {page} / {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Trang sau ▶
          </button>
        </div>
      )}
    </div>
  );
}

export default HomeBody;
