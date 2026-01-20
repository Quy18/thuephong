import "./css/LoginPage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";
import { useUser } from "../context/UserContext";

function LoginPage() {
  const navigate = useNavigate();
  const { dispatch } = useUser();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginApi(form);

      // 1️⃣ lưu token
      localStorage.setItem("token", data.token);

      // lưu user
      localStorage.setItem("user", JSON.stringify(data.user));

      // 2️⃣ lưu user vào global state
      dispatch({
        type: "SET_USER",
        payload: data.user,
      });

      // 3️⃣ redirect
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        {error && <p className="login-error">{error}</p>}

        <div className="login-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 👉 Tạo tài khoản mới */}
        <p className="login-register">
          Chưa có tài khoản?{" "}
          <span onClick={() => navigate("/register")}>
            Tạo tài khoản mới
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
