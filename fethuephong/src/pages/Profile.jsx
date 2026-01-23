import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { updateProfile } from "../api/user";
import "./css/Profile.css";

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&background=1976d2&color=fff";
const BASE_IMAGE_URL = "http://localhost:8000/storage/";

function Profile() {
  const { state, dispatch } = useUser();
  const user = state.user;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    password_old: "",
    password_new: "",
    password_new_confirmation: "",
    avatar: null,
  });

  const [preview, setPreview] = useState(BASE_IMAGE_URL + user?.avatar || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!user) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setForm((prev) => ({ ...prev, avatar: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("phone", form.phone);

      if (form.password_old) {
        formData.append("password_old", form.password_old);
        formData.append("password_new", form.password_new);
        formData.append(
          "password_new_confirmation",
          form.password_new_confirmation
        );
      }

      if (form.avatar) {
        formData.append("avatar", form.avatar);
      }

      const updatedUser = await updateProfile(formData);

      dispatch({ type: "UPDATE_USER", payload: updatedUser });

      alert("✅ Cập nhật thông tin thành công");
      navigate("/home");
    } catch (err) {
      setError(err.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="profile-page">
        <div className="profile-card">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>

          <div className="profile-header">
            <img
              src={ preview || DEFAULT_AVATAR}
              alt="avatar"
              className="profile-avatar"
            />
            

            <div className="profile-basic">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}

            <div className="form-group">
              <label>Họ và tên</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input value={user.email} disabled />
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <hr />

            <div className="form-group">
              <label>Mật khẩu cũ</label>
              <input
                type="password"
                name="password_old"
                value={form.password_old}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                name="password_new"
                value={form.password_new}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Xác nhận mật khẩu mới</label>
              <input
                type="password"
                name="password_new_confirmation"
                value={form.password_new_confirmation}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ảnh đại diện</label>
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>

            <button className="save-btn" disabled={loading}>
              {loading ? "Đang lưu..." : "💾 Lưu thay đổi"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
