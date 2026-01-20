import "./css/Header.css";
function Header() {
  return (
    <header style={styles.header}>
      <h3>🏠 Tìm phòng trọ</h3>
      <button>Logout</button>
    </header>
  );
}

const styles = {
  header: {
    height: 60,
    borderBottom: "1px solid #ddd",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
    flexShrink: 0, // ❗ không bị co
  },
};

export default Header;
