function HomeBody() {
  return (
    <main style={styles.body}>
      <h2>Trang chủ</h2>

      <input
        style={styles.input}
        placeholder="Tìm phòng theo khu vực, giá..."
      />
    </main>
  );
}

const styles = {
  body: {
    flex: 1, // ✅ CHÌA KHÓA full màn hình
    padding: 24,
    overflowY: "auto",
  },
  input: {
    marginTop: 16,
    padding: 10,
    width: 300,
    border: "1px solid #000",
  },
};

export default HomeBody;
