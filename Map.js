import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  TrafficLayer,
} from "@react-google-maps/api";
import billboardData from "../data/billboards.json";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -26.1075,
  lng: 28.0567,
};

export default function MapComponent() {
  const [selected, setSelected] = useState(null);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        <TrafficLayer />
        {billboardData.map((board) => (
          <Marker
            key={board.id}
            position={{ lat: board.lat, lng: board.lng }}
            onClick={() => setSelected(board)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ maxWidth: "220px" }}>
              <h3>{selected.name}</h3>
              <p><strong>Format:</strong> {selected.format}</p>
              <p><strong>Visibility Score:</strong> {selected.visibilityScore}</p>
              <p><strong>Traffic:</strong> {selected.trafficCount.toLocaleString()} cars/day</p>
              <img src={selected.image} alt={selected.name} style={{ width: "100%" }} />
              <a
                href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${selected.lat},${selected.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Street View
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}
