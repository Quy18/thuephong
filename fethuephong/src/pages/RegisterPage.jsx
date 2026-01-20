import "./css/RegisterPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth";
import { useUser } from "../context/UserContext";

function RegisterPage() {
  const navigate = useNavigate();
  const { dispatch } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "renter", // mặc định
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await registerApi(form);

      // lưu token
      localStorage.setItem("token", data.token);

      // lưu user global
      dispatch({
        type: "SET_USER",
        payload: data.user,
      });

      // redirect
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2 className="register-title">Tạo tài khoản</h2>

        {error && <p className="register-error">{error}</p>}

        <div className="register-field">
          <label>Họ tên</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-field">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-field">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="register-field">
          <label>Vai trò</label>
          <div className="register-role">
            <label>
              <input
                type="radio"
                name="role"
                value="renter"
                checked={form.role === "renter"}
                onChange={handleChange}
              />
              Tìm phòng
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="owner"
                checked={form.role === "owner"}
                onChange={handleChange}
              />
              Cho thuê phòng
            </label>
          </div>
        </div>

        <button className="register-btn" disabled={loading}>
          {loading ? "Đang tạo..." : "Đăng ký"}
        </button>

        <p className="register-login">
          Đã có tài khoản?{" "}
          <span onClick={() => navigate("/login")}>Đăng nhập</span>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
