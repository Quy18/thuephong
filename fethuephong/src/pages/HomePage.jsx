import Header from "../components/Header";
import HomeBody from "../components/HomeBody";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <div style={styles.page}>
      <Header />
      <HomeBody />
      <Footer />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#f9fafb",
  },
};

export default HomePage;
