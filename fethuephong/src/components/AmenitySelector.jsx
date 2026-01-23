import "./css/AmenitySelector.css";
import { useEffect, useState } from "react";
import { fetchAmenities } from "../api/amenities";

function AmenitySelector() {
  const [amenities, setAmenities] = useState({});
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAmenities()
      .then((data) => {
        setAmenities(data); // vì backend trả array
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
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

  if (loading) {
    return (
      <div className="card">
        <h3>Tiện ích</h3>
        <p>Đang tải tiện ích...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h3>Tiện ích</h3>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3>Tiện ích</h3>

      <div className="amenity-list">
        {amenities.map((a) => (
          <div key={a.id} className="amenity-row">
            {/* Checkbox */}
            <input
              type="checkbox"
              className="amenity-checkbox"
              checked={!!selected[a.id]}
              onChange={() => toggleAmenity(a.id)}
            />

            {/* Name */}
            <div className="amenity-name">
              {a.default_name}
            </div>

            {/* Right */}
            <div className="amenity-right">
              {selected[a.id] && (
                <>
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
                      type="text"
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
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AmenitySelector;
