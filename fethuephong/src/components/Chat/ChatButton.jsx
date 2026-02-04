import "./css/ChatButton.css";

function ChatButton({ onClick }) {
  return (
    <button className="chat-btn" onClick={onClick}>
      💬
    </button>
  );
}

export default ChatButton;
