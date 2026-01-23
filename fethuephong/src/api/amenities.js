
const API_BASE_URL = "http://localhost:8000/api";
export async function fetchAmenities() {
    const res = await fetch( `${API_BASE_URL}/amenity/get_all`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Không lấy được danh sách tiện ích.");
    }

    return data;
}