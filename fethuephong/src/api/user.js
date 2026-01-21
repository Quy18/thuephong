import { apiFetchImg } from "./api";

export async function updateProfile(formData) {
  const response = await apiFetchImg("http://localhost:8000/api/profile/update", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Cập nhật thất bại");
  }

  return response.json(); // trả về user mới
}