import { useEffect, useState } from "react";
import "./css/Banner.css";

const IMAGES = [
  "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
];

function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner">
      {IMAGES.map((img, i) => (
        <div
          key={i}
          className={`banner-slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="banner-overlay">
        <h1>Tìm phòng nhanh – Ở là thích</h1>
        <p>Hàng ngàn phòng trọ uy tín, giá tốt</p>
      </div>
    </div>
  );
}

export default Banner;
