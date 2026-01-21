import { useState } from "react";
import "./css/SearchFilter.css";

const LOCATION_DATA = {
  "Hà Nội": [
    "Ba Đình",
    "Hoàn Kiếm",
    "Đống Đa",
    "Cầu Giấy",
    "Nam Từ Liêm",
    "Bắc Từ Liêm",
  ],
  "Tp. HCM": [
    "Quận 1",
    "Quận 3",
    "Quận 5",
    "Quận 7",
    "Quận 10",
    "Bình Thạnh",
    "Thủ Đức",
  ],
};

function SearchFilter({ onSearch }) {
  const [filters, setFilters] = useState({
    status: "",
    city: "",
    district: "",
    priceMin: "",
    priceMax: "",
    type: "",
    contract_term: "",
  });

  const handleChange = (key, value) => {
    if (key === "priceMin" || key === "priceMax") {
      value = Math.max(0, Number(value || 0));
    }

    // đổi tỉnh → reset quận
    if (key === "city") {
      setFilters((prev) => ({
        ...prev,
        city: value,
        district: "",
      }));
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      filters.priceMin &&
      filters.priceMax &&
      Number(filters.priceMin) > Number(filters.priceMax)
    ) {
      alert("Giá từ không được lớn hơn giá đến");
      return;
    }

    onSearch(filters);
  };

  const districts = filters.city
    ? LOCATION_DATA[filters.city] || []
    : [];

  return (
    <form className="search-filter" onSubmit={handleSubmit}>
      {/* STATUS */}
      <select
        value={filters.status}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <option value="">📌 Trạng thái</option>
        <option value="available">Còn trống</option>
        <option value="rented">Đã thuê</option>
      </select>

      {/* CITY */}
      <select
        value={filters.city}
        onChange={(e) => handleChange("city", e.target.value)}
      >
        <option value="">📍 Tỉnh / Thành phố</option>
        {Object.keys(LOCATION_DATA).map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {/* DISTRICT */}
      <select
        value={filters.district}
        onChange={(e) => handleChange("district", e.target.value)}
        disabled={!filters.city}
      >
        <option value="">📍 Quận / Huyện</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      {/* PRICE */}
      <input
        type="number"
        min="0"
        placeholder="💰 Giá từ (triệu)"
        value={filters.priceMin}
        onChange={(e) => handleChange("priceMin", e.target.value)}
      />

      <input
        type="number"
        min="0"
        placeholder="💰 Giá đến (triệu)"
        value={filters.priceMax}
        onChange={(e) => handleChange("priceMax", e.target.value)}
      />

      {/* TYPE */}
      <select
        value={filters.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="">🏠 Hình thức</option>
        <option value="free">Giờ giấc tự do</option>
        <option value="common_owner">Chung chủ</option>
      </select>

      {/* CONTRACT */}
      <select
        value={filters.contract_term}
        onChange={(e) => handleChange("contract_term", e.target.value)}
      >
        <option value="">📄 Hợp đồng</option>
        <option value="6">6 tháng</option>
        <option value="12">12 tháng</option>
      </select>

      {/* BUTTON */}
      <button type="submit">🔍 Tìm phòng</button>
    </form>
  );
}

export default SearchFilter;
