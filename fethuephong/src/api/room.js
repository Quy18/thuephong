const API_BASE_URL = "http://localhost:8000/api/room";

export async function fetchRooms({ page = 1 }) {

  const response = await fetch(
    `${API_BASE_URL}/get_all_room?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}
