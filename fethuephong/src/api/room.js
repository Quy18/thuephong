import {apiFetch} from './api';
const API_BASE_URL = "http://localhost:8000/api/room";

export async function fetchRooms(params = {}) {
  const {
    page = 1,
    status = "",
    city = "",
    district = "",
    priceMin = "",
    priceMax = "",
    type = "",
    contract_term = "",
  } = params;

  const query = new URLSearchParams({
    page,
    ...(status && { status }),
    ...(city && { city }),
    ...(district && { district }),
    ...(priceMin && { priceMin }),
    ...(priceMax && { priceMax }),
    ...(type && { type }),
    ...(contract_term && { contract_term }),
  }).toString();

  const response = await apiFetch(
    `${API_BASE_URL}/get_all_room?${query}`
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Fetch rooms failed");
  }
  return response.json();
}

export async function createRoom(formData) {
  const res = await fetch(`${API_BASE_URL}/create_room`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

export async function fetchMyRooms(page = 1) {
  const res = await fetch(
    `${API_BASE_URL}/get_room?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) throw data;

  return data;
}

