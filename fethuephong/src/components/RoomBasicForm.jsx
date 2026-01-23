// components/RoomBasicForm.jsx
import "./css/RoomBasicForm.css";

function RoomBasicForm({ form, setForm, images, setImages }) {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  return (
    <div className="card">
      <h3>Thông tin cơ bản</h3>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Tiêu đề phòng"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        rows="4"
        placeholder="Mô tả phòng"
      />

      <div className="row-2">
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Giá thuê (đ)" />
        <input name="area" type="number" value={form.area} onChange={handleChange} placeholder="Diện tích (m²)" />
      </div>

      <div className="row-2">
        <input name="electricity_price" type="number" value={form.electricity_price} onChange={handleChange} placeholder="Tiền điện / kWh" />
        <input name="water_price" type="number" value={form.water_price} onChange={handleChange} placeholder="Tiền nước / m³" />
      </div>

      <input name="service_price" type="number" value={form.service_price} onChange={handleChange} placeholder="Phí dịch vụ" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Địa chỉ chi tiết" />

      <div className="row-2">
        <input name="ward" value={form.ward} onChange={handleChange} placeholder="Phường" />
        <input name="district" value={form.district} onChange={handleChange} placeholder="Quận" />
      </div>

      <input name="city" value={form.city} onChange={handleChange} placeholder="Thành phố" />

      <select name="type" value={form.type} onChange={handleChange}>
        <option value="free">Giờ giấc tự do</option>
        <option value="common_owner">Chung chủ</option>
      </select>

      <input
        name="contract_term"
        value={form.contract_term}
        onChange={handleChange}
        placeholder="Thời hạn hợp đồng (vd: 6 tháng)"
      />

      <div className="upload-box">
        <label>📷 Hình ảnh phòng</label>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        {images.length > 0 && <p>Đã chọn {images.length} ảnh</p>}
      </div>
    </div>
  );
}

export default RoomBasicForm;
