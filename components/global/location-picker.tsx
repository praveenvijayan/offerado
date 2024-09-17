import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

type Location = {
  lat: number;
  lng: number;
};

type LocationPickerProps = {
  setLocation: (location: Location) => void;
};
// Custom marker icon (optional)
const markerIcon = new L.Icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to add search control to an existing map
const SearchControl = () => {
  const map = useMap(); // Access the map instance from react-leaflet

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: "bar",
      autoComplete: true,
      autoCompleteDelay: 250,
      showMarker: true,
      marker: {
        icon: markerIcon,
      },
    });

    map.addControl(searchControl); // Add search control to the existing map

    return () => {
      map.removeControl(searchControl); // Clean up when component unmounts
    };
  }, [map]);

  return null; // This component does not render anything visually
};

// Main LocationPicker component
const LocationPicker = ({ setLocation }: LocationPickerProps) => {
  const [position, setPosition] = useState(null);

  // Handle map clicks to set location
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng] as any);
        setLocation({ lat, lng });
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={markerIcon} />
    );
  };

  return (
    <MapContainer
      center={[51.505, -0.09]} // Default center (London)
      zoom={13}
      style={{ height: "200px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* Add the search control to the map */}
      <SearchControl />
      {/* Handle map clicks */}
      <MapClickHandler />
    </MapContainer>
  );
};

export default LocationPicker;
