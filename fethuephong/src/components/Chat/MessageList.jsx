const fakeMessages = [
  { id: 1, sender: "me", text: "Phòng còn không?" },
  { id: 2, sender: "other", text: "Còn nhé" },
  { id: 3, sender: "me", text: "Giá bao nhiêu?" },
];

function MessageList() {
  return (
    <div className="message-list">
      {fakeMessages.map((m, index) => (
        <div
          key={m.id}
          className={`message ${m.sender}`}
        >
          <span>{m.text}</span>

          {/* ✅ CHỈ MESSAGE CUỐI */}
          {index === fakeMessages.length - 1 &&
            m.sender === "me" && (
              <small className="read-status">
                ✔✔ Đã xem
              </small>
            )}
        </div>
      ))}
    </div>
  );
}

export default MessageList;
