"use client";

import { Building2, Crosshair, Minus, Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { cityPoints } from "@/content/storeNetwork";
import type { MapPoint, StoreCity } from "@/content/types";
import { cn } from "@/lib/utils";

export type MapMarker = {
  id: string;
  point: MapPoint;
  label: string;
  detail?: string;
  kind: "branch" | "reseller";
  /** Set on cluster markers to render a count instead of an icon. */
  count?: number;
};

const ZOOM_MIN = 1;
const ZOOM_MAX = 2.2;
const ZOOM_STEP = 0.3;

const labelledCities: StoreCity[] = ["Dubai", "Sharjah", "Ajman", "Abu Dhabi", "Al Ain"];

/**
 * Schematic UAE map. Deliberately not a tile provider — it renders the store
 * network as positioned markers over vector artwork so the page stays static,
 * has no third-party script and needs no API key.
 */
export function UaeMap({
  markers,
  activeId,
  onSelect,
  onReset,
  controls = "bottom-right",
  showLocate = false,
  labelOffset = 0,
  className,
  ariaLabel = "Map of ARP locations across the UAE",
}: {
  markers: MapMarker[];
  activeId?: string;
  onSelect?: (id: string) => void;
  onReset?: () => void;
  controls?: "top-left" | "bottom-right";
  showLocate?: boolean;
  /** Nudges city labels sideways so they clear cluster markers. */
  labelOffset?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const [zoom, setZoom] = useState(ZOOM_MIN);
  const counterScale = 1 / zoom;

  function zoomBy(delta: number) {
    setZoom((current) => {
      const next = Math.round((current + delta) * 100) / 100;
      return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, next));
    });
  }

  return (
    <div className={cn("uae-map", className)} role="group" aria-label={ariaLabel}>
      <div className="uae-map-canvas" style={{ transform: `scale(${zoom})` }}>
        <MapArtwork />

        {labelledCities.map((city) => (
          <span
            key={city}
            className="uae-map-label"
            style={{
              left: `${cityPoints[city].x + labelOffset}%`,
              top: `${cityPoints[city].y}%`,
              transform: `translate(-50%, -50%) scale(${counterScale})`,
            }}
          >
            {city}
          </span>
        ))}

        {markers.map((marker) => {
          const isActive = marker.id === activeId;
          const isCluster = typeof marker.count === "number";
          const Icon = marker.kind === "branch" ? Building2 : ShieldCheck;

          return (
            <button
              key={marker.id}
              type="button"
              className={cn(
                "uae-map-pin",
                `uae-map-pin-${marker.kind}`,
                isCluster && "uae-map-pin-cluster",
                isActive && "uae-map-pin-active",
              )}
              style={{
                left: `${marker.point.x}%`,
                top: `${marker.point.y}%`,
                transform: `translate(-50%, -50%) scale(${counterScale})`,
              }}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onSelect?.(marker.id)}
            >
              <span className="uae-map-pin-face">
                {isCluster ? marker.count : <Icon size={16} aria-hidden="true" />}
              </span>
              <span className="uae-map-tooltip">
                <strong>{marker.label}</strong>
                {marker.detail ? <small>{marker.detail}</small> : null}
              </span>
              <span className="sr-only">
                {marker.label}
                {isCluster ? ` — ${marker.count} ${marker.count === 1 ? "location" : "locations"}` : ""}
              </span>
            </button>
          );
        })}
      </div>

      <div className={cn("uae-map-controls", `uae-map-controls-${controls}`)}>
        <button
          type="button"
          onClick={() => zoomBy(ZOOM_STEP)}
          disabled={zoom >= ZOOM_MAX}
          aria-label="Zoom in"
        >
          <Plus size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => zoomBy(-ZOOM_STEP)}
          disabled={zoom <= ZOOM_MIN}
          aria-label="Zoom out"
        >
          <Minus size={16} aria-hidden="true" />
        </button>
        {showLocate ? (
          <button
            type="button"
            onClick={() => {
              setZoom(ZOOM_MIN);
              onReset?.();
            }}
            aria-label="Reset map and show nearest location"
          >
            <Crosshair size={16} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

/** Coastline, inland fill and highway schematic. Purely decorative. */
function MapArtwork() {
  return (
    <svg
      className="uae-map-art"
      viewBox="0 0 400 300"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="uae-land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4f8fc" />
          <stop offset="55%" stopColor="#fbfcfe" />
          <stop offset="100%" stopColor="#f7f4ee" />
        </linearGradient>
      </defs>

      <rect width="400" height="300" fill="#dcecf8" />

      {/* Landmass with a Gulf coastline running along the top-left. */}
      <path
        d="M0 300 L0 214 L34 196 L58 176 L92 158 L118 140 L146 126 L176 108 L206 92 L238 78 L268 60 L300 44 L332 26 L366 12 L400 4 L400 300 Z"
        fill="url(#uae-land)"
      />

      {/* Inland green belts. */}
      <path d="M262 236 q34 -22 76 -12 q-30 30 -76 26 Z" fill="#e6f2e3" />
      <path d="M96 268 q40 -16 74 4 q-36 20 -74 -4 Z" fill="#e9f3e6" />

      {/* Highways. */}
      <g stroke="#dbe4ef" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M18 250 L120 196 L214 148 L308 96 L392 52" />
        <path d="M52 288 L150 240 L246 190 L340 140 L396 112" />
        <path d="M232 132 L268 196 L292 268" />
        <path d="M148 132 L176 210" />
      </g>
      <g stroke="#eef3f8" strokeWidth="1.5" fill="none">
        <path d="M84 232 L188 178 L286 128" />
        <path d="M196 108 L226 168 L248 234" />
        <path d="M300 74 L330 132 L352 196" />
      </g>

      {/* Road shields. */}
      <g fontSize="7" fontWeight="700" fill="#96a6bb" textAnchor="middle">
        <text x="196" y="152">E11</text>
        <text x="286" y="196">E311</text>
        <text x="120" y="252">E65</text>
        <text x="344" y="86">E88</text>
      </g>
    </svg>
  );
}
