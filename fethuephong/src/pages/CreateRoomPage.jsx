// pages/CreateRoomPage.jsx
import "./css/CreateRoomPage.css";
import Header from "../components/Header";
import RoomBasicForm from "../components/RoomBasicForm";
import AmenitySelector from "../components/AmenitySelector";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createRoom } from "../api/room";

function CreateRoomPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    service_price: "",
    electricity_price: "",
    water_price: "",
    contract_term: "",
    type: "free",
    area: "",
    address: "",
    ward: "",
    district: "",
    city: "",
  });

  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const formData = new FormData();

    // 1️⃣ Room basic info
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formData.append(key, value);
      }
    });

    // 2️⃣ Images
    images.forEach((file) => {
      formData.append("images[]", file);
    });

    // 3️⃣ Amenities (FORMAT CHUẨN CHO LARAVEL)
    Object.entries(amenities).forEach(([amenityTypeId, value], index) => {
      formData.append(
        `amenities[${index}][amenity_type_id]`,
        amenityTypeId
      );

      formData.append(
        `amenities[${index}][quantity]`,
        value.quantity
      );

      if (value.custom_name) {
        formData.append(
          `amenities[${index}][custom_name]`,
          value.custom_name
        );
      }
    });

    // 🔍 debug (khi cần)
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    try {
      setLoading(true);

      await createRoom(formData);

      alert("🎉 Đăng phòng thành công");
      navigate(-1);

    } catch (err) {
      console.error(err);
      alert("❌ Đăng phòng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="create-room-wrapper">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h2>🏠 Đăng phòng trọ</h2>
        </div>

        <div className="create-room-layout">
          <RoomBasicForm
            form={form}
            setForm={setForm}
            images={images}
            setImages={setImages}
          />

          <AmenitySelector
            selected={amenities}
            setSelected={setAmenities}
          />
        </div>

        <div className="submit-wrapper">
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Đang đăng..." : "Đăng phòng"}
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateRoomPage;
