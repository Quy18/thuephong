function Footer() {
  return (
    <footer style={styles.footer}>
      © 2026 Ứng dụng tìm phòng trọ
    </footer>
  );
}

const styles = {
  footer: {
    height: 50,
    borderTop: "1px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fff",
    fontSize: 14,
    flexShrink: 0,
  },
};

export default Footer;
