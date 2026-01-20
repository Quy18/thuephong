import { useState } from "react";
import RoomCard from "./RoomCard";
import "./css/HomeBody.css";

const ROOMS = [
  {
    id: 1,
    image: "https://picsum.photos/400/300?random=1",
    price: "3.500.000",
    address: "Quận Bình Thạnh, TP.HCM",
    status: "available",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/300?random=2",
    price: "4.200.000",
    address: "Quận Gò Vấp, TP.HCM",
    status: "rented",
  },
  {
    id: 3,
    image: "https://picsum.photos/400/300?random=3",
    price: "2.800.000",
    address: "Quận Tân Bình, TP.HCM",
    status: "available",
  },
  {
    id: 4,
    image: "https://picsum.photos/400/300?random=4",
    price: "5.000.000",
    address: "Quận 1, TP.HCM",
    status: "rented",
  },
  {
    id: 5,
    image: "https://picsum.photos/400/300?random=5",
    price: "3.200.000",
    address: "Quận Thủ Đức, TP.HCM",
    status: "available",
  },
  {
    id: 6,
    image: "https://picsum.photos/400/300?random=6",
    price: "4.800.000",
    address: "Quận 7, TP.HCM",
    status: "rented",
  },
  {
    id: 7,
    image: "https://picsum.photos/400/300?random=7",
    price: "2.600.000",
    address: "Quận 12, TP.HCM",
    status: "available",
  },
  {
    id: 8,
    image: "https://picsum.photos/400/300?random=8",
    price: "3.900.000",
    address: "Quận Phú Nhuận, TP.HCM",
    status: "rented",
  },
  {
    id: 9,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
  {
    id: 10,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
  {
    id: 11,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
  {
    id: 12,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
  {
    id: 13,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
  {
    id: 14,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
  {
    id: 15,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
  {
    id: 16,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
  {
    id: 17,
    image: "https://picsum.photos/400/300?random=9",
    price: "6.100.000",
    address: "Quận 3, TP.HCM",
    status: "available",
  },
];

const PAGE_SIZE = 12; // 6 phòng / trang (2 hàng)

function HomeBody() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(ROOMS.length / PAGE_SIZE);
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentRooms = ROOMS.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="home-body">
      <h2 className="home-title">Phòng đang cho thuê</h2>

      <div className="room-grid">
        {currentRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ◀ Trước
        </button>

        <span>
          Trang {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Sau ▶
        </button>
      </div>
    </div>
  );
}

export default HomeBody;
