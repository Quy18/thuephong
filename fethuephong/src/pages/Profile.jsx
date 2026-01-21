import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./css/Profile.css";

const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=1976d2&color=fff";

function Profile() {
  const { state } = useUser();
  const user = state.user;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  const [preview, setPreview] = useState(user?.avatar || "");

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ chọn ảnh từ máy
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, avatar: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);

    if (form.avatar instanceof File) {
      formData.append("avatar", form.avatar);
    }

    console.log("FORM DATA READY");
    alert("Demo: form đã sẵn sàng gửi API");
  };

  return (
    <>
      <Header />

      <div className="profile-page">
        <div className="profile-card">
          {/* BACK */}
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>

          {/* HEADER */}
          <div className="profile-header">
            <img
              src={preview || DEFAULT_AVATAR}
              alt="avatar"
              className="profile-avatar"
            />

            <div className="profile-basic">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          {/* FORM */}
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={user.email} disabled />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            {/* UPLOAD */}
            <div className="form-group">
              <label>Ảnh đại diện</label>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>

            <button type="submit" className="save-btn">
              💾 Lưu thay đổi
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
