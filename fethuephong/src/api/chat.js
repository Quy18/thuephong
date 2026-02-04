const API_BASE_URL = "http://localhost:8000/api";

export async function createConversation({ room_id, owner_id }) {
  const token = localStorage.getItem("token");

  const body = new URLSearchParams();
  body.append("room_id", room_id);
  body.append("owner_id", owner_id);

  const res = await fetch(`${API_BASE_URL}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body: body.toString(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
