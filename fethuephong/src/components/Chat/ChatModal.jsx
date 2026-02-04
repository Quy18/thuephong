import { useState } from "react";
import "./css/ChatModal.css";

const CURRENT_USER_ID = 1; // giả lập user hiện tại

// 🔹 DATA GIẢ (sau này thay bằng API)
const conversationsMock = [
  {
    id: 1,
    name: "Chủ trọ Minh",
    lastMessage: "Phòng còn trống nhé",
    lastTime: "10:30",
    unread: 1,
    messages: [
      {
        id: 1,
        senderId: 2,
        text: "Chào bạn, phòng còn không?",
        seen: true,
      },
      {
        id: 2,
        senderId: 1,
        text: "Dạ còn ạ",
        seen: true,
      },
      {
        id: 3,
        senderId: 2,
        text: "Phòng còn trống nhé",
        seen: false,
      },
    ],
  },
  {
    id: 2,
    name: "Chị Hạnh",
    lastMessage: "Ok em",
    lastTime: "Hôm qua",
    unread: 0,
    messages: [
      {
        id: 1,
        senderId: 1,
        text: "Em qua xem phòng được không ạ?",
        seen: true,
      },
      {
        id: 2,
        senderId: 2,
        text: "Ok em",
        seen: true,
      },
    ],
  },
];

function ChatModal({ onClose, conversation, room }) {
  const [conversations] = useState(conversationsMock);
  const [activeConversation, setActiveConversation] = useState(null);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    // ❌ chưa call API
    // Sau này gọi API gửi tin nhắn ở đây

    setMessage("");
  };

  return (
    <div className="chat-modal">
      {/* HEADER */}
      <div className="chat-header">
        <span>💬 Tin nhắn</span>
        <button onClick={onClose}>✖</button>
      </div>

      <div className="chat-body">
        {/* DANH SÁCH CONVERSATION */}
        <div className="conversation-list">
          {conversations.map((c) => (
            <div
              key={c.id}
              className={`conversation-item ${
                activeConversation?.id === c.id ? "active" : ""
              }`}
              onClick={() => setActiveConversation(c)}
            >
              <div className="conversation-name">{c.name}</div>
              <div className="conversation-last">
                {c.lastMessage}
              </div>
            </div>
          ))}
        </div>

        {/* KHUNG CHAT */}
        <div className="chat-content">
          {!activeConversation ? (
            <div className="chat-empty">
              Chọn một cuộc trò chuyện
            </div>
          ) : (
            <>
              <div className="chat-messages">
                {activeConversation.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`chat-message ${
                      m.senderId === CURRENT_USER_ID ? "me" : "other"
                    }`}
                  >
                    <div className="chat-bubble">
                      {m.text}
                    </div>

                    {m.senderId === CURRENT_USER_ID && (
                      <div className="chat-seen">
                        {m.seen ? "Đã xem" : "Đã gửi"}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="chat-input">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <button onClick={handleSend}>Gửi</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatModal;
