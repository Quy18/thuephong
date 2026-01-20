import Header from "../components/Header";
import HomeBody from "../components/HomeBody";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

function HomePage() {
  return (
    <div style={styles.page}>
      <Header />
      <Banner />
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
