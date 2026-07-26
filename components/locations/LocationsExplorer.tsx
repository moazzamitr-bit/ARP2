"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Car,
  ChevronDown,
  ChevronRight,
  Clock,
  Headphones,
  LayoutGrid,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  RotateCcw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  countByCity,
  primaryCities,
  secondaryCities,
  storeBranches,
  storeSupport,
} from "@/content/storeNetwork";
import type { StoreAmenity, StoreBranch, StoreCity } from "@/content/types";
import { cn } from "@/lib/utils";
import { UaeMap, type MapMarker } from "./UaeMap";

const PAGE_SIZE = 4;
const ALL_CITIES = "All Cities";

const amenityIcons: Record<StoreAmenity, typeof Car> = {
  "Free Parking": Car,
  "Product Experts": UserRound,
  "Easy Returns": RotateCcw,
  "Secure Payments": ShieldCheck,
};

/** `intro` renders above the filters so the page heading shares the list column. */
export function LocationsExplorer({ intro }: { intro?: ReactNode }) {
  const [city, setCity] = useState<StoreCity | typeof ALL_CITIES>(ALL_CITIES);
  const [showMoreCities, setShowMoreCities] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeId, setActiveId] = useState(storeBranches[0].id);

  const filtered = useMemo(
    () => (city === ALL_CITIES ? storeBranches : storeBranches.filter((store) => store.city === city)),
    [city],
  );

  const visible = filtered.slice(0, visibleCount);
  const active = storeBranches.find((store) => store.id === activeId) ?? storeBranches[0];

  const clusters: MapMarker[] = useMemo(
    () =>
      countByCity().map((entry) => ({
        id: entry.city,
        point: entry.point,
        label: entry.city,
        detail: `${entry.count} ${entry.count === 1 ? "location" : "locations"}`,
        kind: "branch" as const,
        count: entry.count,
      })),
    [],
  );

  function selectCity(next: StoreCity | typeof ALL_CITIES) {
    setCity(next);
    setVisibleCount(PAGE_SIZE);
    const firstInCity =
      next === ALL_CITIES ? storeBranches[0] : storeBranches.find((store) => store.city === next);
    if (firstInCity) setActiveId(firstInCity.id);
  }

  const cityChips: (StoreCity | typeof ALL_CITIES)[] = [
    ALL_CITIES,
    ...primaryCities,
    ...(showMoreCities ? secondaryCities : []),
  ];

  return (
    <div className="locations-explorer">
      <div className="locations-primary">
        {intro}
        <div className="city-chip-row" role="group" aria-label="Filter locations by city">
          {cityChips.map((item) => (
            <button
              key={item}
              type="button"
              className={cn("city-chip", city === item && "city-chip-active")}
              aria-pressed={city === item}
              onClick={() => selectCity(item)}
            >
              {item === ALL_CITIES ? <LayoutGrid size={15} aria-hidden="true" /> : null}
              {item}
            </button>
          ))}
          {secondaryCities.length > 0 ? (
            <button
              type="button"
              className={cn("city-chip", "city-chip-more", showMoreCities && "city-chip-more-open")}
              aria-expanded={showMoreCities}
              onClick={() => setShowMoreCities((open) => !open)}
            >
              {showMoreCities ? "Less" : "More"}
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          ) : null}
        </div>

        <p className="locations-count" role="status">
          {filtered.length} {filtered.length === 1 ? "Location" : "Locations"} Found
        </p>

        {visible.length > 0 ? (
          <ul className="locations-list">
            {visible.map((store) => (
              <li key={store.id}>
                <StoreCard
                  store={store}
                  active={store.id === activeId}
                  onSelect={() => setActiveId(store.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="locations-empty">
            <MapPin size={22} aria-hidden="true" />
            <h3>No ARP branch in {city} yet</h3>
            <p>
              We have not opened a branch here, but authorized resellers in {city} stock the brands we
              distribute.
            </p>
            <Link className="btn btn-secondary" href="/authorized-resellers">
              <span>View authorized resellers</span>
              <ChevronRight size={17} aria-hidden="true" />
            </Link>
          </div>
        )}

        {visibleCount < filtered.length ? (
          <div className="locations-load-more">
            <button
              type="button"
              className="load-more-btn"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            >
              Load More Locations
              <ChevronDown size={17} aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="locations-secondary">
        <UaeMap
          markers={clusters}
          activeId={city === ALL_CITIES ? undefined : city}
          onSelect={(id) => selectCity(id as StoreCity)}
          onReset={() => selectCity(ALL_CITIES)}
          controls="top-left"
          showLocate
          labelOffset={-9}
          className="locations-map"
          ariaLabel="ARP locations by city — select a city to filter the list"
        />
        <StoreDetail store={active} />
      </div>
    </div>
  );
}

function StoreCard({
  store,
  active,
  onSelect,
}: {
  store: StoreBranch;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={cn("store-card", active && "store-card-active")}
      aria-current={active ? "true" : undefined}
      onClick={onSelect}
    >
      <span className="store-card-media">
        <Image src={store.image} alt="" width={192} height={124} sizes="192px" />
        {store.kind === "Main Showroom" ? (
          <span className="store-card-badge">Main Showroom</span>
        ) : null}
      </span>
      <span className="store-card-body">
        <span className="store-card-head">
          <strong>{store.name}</strong>
          <em>{store.distance}</em>
        </span>
        <span className="store-card-meta">
          <MapPin size={14} aria-hidden="true" />
          {store.address}
        </span>
        <span className="store-card-meta">
          <Clock size={14} aria-hidden="true" />
          {store.hoursSummary}
          <Phone size={14} aria-hidden="true" />
          {store.phone}
        </span>
      </span>
      <ChevronRight className="store-card-chevron" size={18} aria-hidden="true" />
    </button>
  );
}

function StoreDetail({ store }: { store: StoreBranch }) {
  return (
    <article className="store-detail" aria-live="polite">
      <div className="store-detail-head">
        <div>
          <span className="store-detail-pill">{store.kind}</span>
          <h2>{store.name}</h2>
          <p className="store-detail-address">
            <MapPin size={16} aria-hidden="true" />
            {store.address}
          </p>
        </div>
        <Image
          className="store-detail-image"
          src={store.image}
          alt={store.name}
          width={320}
          height={200}
          sizes="200px"
        />
      </div>

      <div className="store-detail-actions">
        <a className="btn btn-primary" href={telHref(store.phone)}>
          <Phone size={16} aria-hidden="true" />
          <span>Call Store</span>
        </a>
        <a
          className="btn btn-secondary"
          href={store.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation size={16} aria-hidden="true" />
          <span>Get Directions</span>
        </a>
        <a
          className="btn btn-secondary"
          href={whatsappHref(store.whatsapp)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={16} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>

      <div className="store-detail-panels">
        <div className="store-hours">
          <h3>
            <Clock size={16} aria-hidden="true" />
            Opening Hours
          </h3>
          <dl>
            {store.openingHours.map((row) => (
              <div key={row.days}>
                <dt>{row.days}</dt>
                <dd className={row.time === "Closed" ? "is-closed" : undefined}>{row.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="store-help">
          <div className="store-help-head">
            <h3>Need Help?</h3>
            <Headphones size={22} aria-hidden="true" />
          </div>
          <p>{storeSupport.blurb}</p>
          <a href={storeSupport.phoneHref}>
            <Phone size={15} aria-hidden="true" />
            {storeSupport.phone}
          </a>
          <a href={`mailto:${storeSupport.email}`}>
            <Mail size={15} aria-hidden="true" />
            {storeSupport.email}
          </a>
        </div>
      </div>

      <ul className="store-amenities">
        {store.amenities.map((amenity) => {
          const Icon = amenityIcons[amenity];
          return (
            <li key={amenity}>
              <Icon size={17} aria-hidden="true" />
              {amenity}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function whatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}
