import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import RoomCard from "../components/RoomCard";
import { aiSearchRooms } from "../api/room";
import "./css/SearchPage.css";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const keyword = searchParams.get("keyword");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword) return;

    setLoading(true);
    aiSearchRooms(keyword)
      .then((res) => setRooms(res.data || []))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, [keyword]);

  return (
    <>
      <Header />

      <div className="search-page">
        {/* Header của trang search */}
        <div className="search-header">
          <button className="back-btn" onClick={() => navigate('/home')}>
            ←
          </button>

          <h2 className="search-title">
            Kết quả tìm kiếm cho: <span>{keyword}</span>
          </h2>
        </div>

        {loading && (
          <p className="search-loading">
            🤖 AI đang phân tích và tìm phòng phù hợp...
          </p>
        )}

        {!loading && rooms.length === 0 && (
          <div className="search-empty">
            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486747.png"
              alt="empty"
            />
            <p>Không tìm thấy phòng phù hợp với yêu cầu của bạn</p>
          </div>
        )}

        <div className="search-room-grid">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={{
              id: room.id,
              title: room.title,
              contract_term: room.contract_term,
              image: `https://picsum.photos/400/300?random=${room.id}`,
              price: room.price.toLocaleString("vi-VN"),
              address: `${room.district}, ${room.city}`,
              status: room.status,
              owner: room.owner,
              images: room.images,
            }} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
