import "./css/RoomBasicForm.css";
import { useState } from "react";

function RoomBasicForm() {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className="card">
      <h3>Thông tin cơ bản</h3>

      <input type="text" placeholder="Tiêu đề phòng" />
      <textarea placeholder="Mô tả phòng" rows="4" />

      <div className="row-2">
        <input type="number" placeholder="Giá thuê (đ)" />
        <input type="number" placeholder="Diện tích (m²)" />
      </div>

      <div className="row-2">
        <input type="number" placeholder="Tiền điện / kWh" />
        <input type="number" placeholder="Tiền nước / m³" />
      </div>

      <input type="number" placeholder="Phí dịch vụ" />
      <input type="text" placeholder="Địa chỉ chi tiết" />

      <div className="row-2">
        <input type="text" placeholder="Phường" />
        <input type="text" placeholder="Quận" />
      </div>

      <input type="text" placeholder="Thành phố" />

      <select>
        <option value="free">Giờ giấc tự do</option>
        <option value="common_owner">Chung chủ</option>
      </select>

      <input type="text" placeholder="Thời hạn hợp đồng (vd: 6 tháng)" />

      <div className="upload-box">
        <label>📷 Hình ảnh phòng (có thể chọn nhiều)</label>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />

        {images.length > 0 && (
          <p className="image-count">Đã chọn {images.length} ảnh</p>
        )}
      </div>
    </div>
  );
}

export default RoomBasicForm;
