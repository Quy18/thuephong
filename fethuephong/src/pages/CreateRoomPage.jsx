import "./css/CreateRoomPage.css";
import Header from "../components/Header";
import RoomBasicForm from "../components/RoomBasicForm";
import AmenitySelector from "../components/AmenitySelector";
import { useNavigate } from "react-router-dom";

function CreateRoomPage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    
  };

  return (
    <>
      <Header />

      <div className="create-room-wrapper">
        <div className="page-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Quay lại
          </button>
          <h2>🏠 Đăng phòng trọ</h2>
        </div>

        <div className="create-room-layout">
          <RoomBasicForm />
          <AmenitySelector />
        </div>

        <div className="submit-wrapper">
          <button className="submit-btn" onClick={handleSubmit}>
            Đăng phòng
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateRoomPage;
