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

