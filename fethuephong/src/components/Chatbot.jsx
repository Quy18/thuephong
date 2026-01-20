import { useState } from "react";
import "./css/Chatbot.css";

function Chatbot() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NÚT TRÒN */}
      <div className="chatbot-button" onClick={() => setOpen(!open)}>
        💬
      </div>

      {/* HỘP CHAT */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🤖 Hỗ trợ tìm phòng</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-body">
            <div className="bot-msg">
              Xin chào 👋<br />
              Tôi có thể giúp bạn tìm phòng phù hợp.
            </div>

            <div className="user-msg">
              Tôi muốn tìm phòng dưới 4 triệu
            </div>
          </div>

          <div className="chatbot-input">
            <input type="text" placeholder="Nhập tin nhắn..." />
            <button>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
