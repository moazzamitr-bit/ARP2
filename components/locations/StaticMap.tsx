import { Building2, MapPin } from "lucide-react";

export function StaticMap() {
  return (
    <div className="static-map" aria-label="Map-ready UAE locations view">
      <div className="map-lines" />
      <span className="map-city map-dubai">Dubai</span>
      <span className="map-city map-sharjah">Sharjah</span>
      <span className="map-city map-abu">Abu Dhabi</span>
      <span className="map-city map-alain">Al Ain</span>
      <span className="map-pin pin-1">
        <Building2 size={18} />
      </span>
      <span className="map-pin pin-2">
        <MapPin size={18} />
      </span>
      <span className="map-pin pin-3">
        <Building2 size={18} />
      </span>
      <span className="map-pin pin-4">
        <MapPin size={18} />
      </span>
    </div>
  );
}
