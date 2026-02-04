import RoomSystemMessage from "./RoomSystemMessage";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function ChatContent({ conversation }) {
  // 🔥 demo room gắn theo conversation
  const room = {
    title: "Phòng trọ Quận 7",
    price: 3500000,
    address: "Quận 7, TP.HCM",
    image: "https://picsum.photos/300/200",
  };

  return (
    <div className="chat-content">
      <RoomSystemMessage room={room} />
      <MessageList />
      <MessageInput />
    </div>
  );
}

export default ChatContent;
