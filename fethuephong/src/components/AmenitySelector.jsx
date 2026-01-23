import "./css/AmenitySelector.css";
import { useEffect, useState } from "react";
import { fetchAmenities } from "../api/amenities";

function AmenitySelector({ selected, setSelected }) {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAmenities().then((data) => {
      setAmenities(data);
      setLoading(false);
    });
  }, []);

  const toggleAmenity = (id) => {
    setSelected((prev) =>
      prev[id]
        ? (() => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
          })()
        : { ...prev, [id]: { quantity: 1, custom_name: "" } }
    );
  };

  if (loading) return <div className="card">Đang tải tiện ích...</div>;

  return (
    <div className="card">
      <h3>Tiện ích</h3>

      <div className="amenity-list">
        {amenities.map((a) => (
          <div key={a.id} className="amenity-row">
            <input
              type="checkbox"
              checked={!!selected[a.id]}
              onChange={() => toggleAmenity(a.id)}
            />

            <span className="amenity-name">{a.default_name}</span>

            {selected[a.id] && (
              <div className="amenity-right">
                <input
                  type="number"
                  min="1"
                  value={selected[a.id].quantity}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      [a.id]: {
                        ...selected[a.id],
                        quantity: Number(e.target.value),
                      },
                    })
                  }
                />

                {a.id === 16 && (
                  <input
                    placeholder="Tên tiện ích"
                    value={selected[a.id].custom_name}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        [a.id]: {
                          ...selected[a.id],
                          custom_name: e.target.value,
                        },
                      })
                    }
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AmenitySelector;
