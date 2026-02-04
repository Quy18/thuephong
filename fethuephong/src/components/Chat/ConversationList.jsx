const fakeConversations = [
  {
    id: 1,
    name: "Chủ trọ A",
    lastMessage: "Phòng còn nhé",
    unread: true,
  },
];

function ConversationList({ selected, onSelect }) {
  return (
    <div className="conversation-list">
      {fakeConversations.map((c) => (
        <div
          key={c.id}
          className={`conversation-item ${
            selected?.id === c.id ? "active" : ""
          }`}
          onClick={() => onSelect(c)}
        >
          <strong>{c.name}</strong>
          <p>{c.lastMessage}</p>
          {c.unread && <span className="unread-dot" />}
        </div>
      ))}
    </div>
  );
}

export default ConversationList;
