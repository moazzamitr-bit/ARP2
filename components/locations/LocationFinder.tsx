"use client";

import Image from "next/image";
import { Building2, MapPin, Phone, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { brands } from "@/content/brands";
import { emirates } from "@/content/contact";
import { locations } from "@/content/locations";
import type { Location } from "@/content/types";
import { StaticMap } from "./StaticMap";

type Tab = "Official Branch" | "Authorized Reseller";

export function LocationFinder() {
  const [tab, setTab] = useState<Tab>("Official Branch");
  const [query, setQuery] = useState("");
  const [emirate, setEmirate] = useState("All Emirates");
  const [brand, setBrand] = useState("All Brands");
  const [activeId, setActiveId] = useState("dubai-flagship");

  const filtered = useMemo(
    () =>
      locations.filter((location) => {
        const matchesTab = location.storeType === tab;
        const matchesQuery =
          query.trim().length === 0 ||
          `${location.name} ${location.city} ${location.address}`.toLowerCase().includes(query.toLowerCase());
        const matchesEmirate = emirate === "All Emirates" || location.emirate === emirate;
        const matchesBrand = brand === "All Brands" || location.brands.includes(brand);
        return matchesTab && matchesQuery && matchesEmirate && matchesBrand;
      }),
    [brand, emirate, query, tab],
  );

  const active = locations.find((location) => location.id === activeId) ?? filtered[0] ?? locations[0];

  return (
    <div id="where-to-buy" className="where-buy">
      <div className="tabs" role="tablist" aria-label="Where to buy categories">
        {(["Official Branch", "Authorized Reseller"] as Tab[]).map((item) => (
          <button
            key={item}
            role="tab"
            type="button"
            aria-selected={tab === item}
            className={tab === item ? "tab tab-active" : "tab"}
            onClick={() => {
              setTab(item);
              const next = locations.find((location) => location.storeType === item);
              if (next) setActiveId(next.id);
            }}
          >
            {item === "Official Branch" ? <Building2 size={17} /> : <ShieldCheck size={17} />}
            {item === "Official Branch" ? "ARP Official Branches" : "Authorized Resellers"}
          </button>
        ))}
      </div>

      <div className="location-filters">
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search by city, area or store</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by city, area or store"
          />
        </label>
        <FilterSelect label="Emirate" value={emirate} onChange={setEmirate} options={["All Emirates", ...emirates]} />
        <FilterSelect label="Brand" value={brand} onChange={setBrand} options={["All Brands", ...brands.map((item) => item.name)]} />
        <FilterSelect label="Store Type" value={tab} onChange={(value) => setTab(value as Tab)} options={["Official Branch", "Authorized Reseller"]} />
      </div>

      <div className="location-layout">
        <div className="location-list">
          <p className="list-count">{filtered.length} Locations Found</p>
          {filtered.map((location) => (
            <LocationRow
              key={location.id}
              location={location}
              active={active.id === location.id}
              onClick={() => setActiveId(location.id)}
            />
          ))}
        </div>
        <div className="location-detail-wrap">
          <StaticMap />
          <LocationDetail location={active} />
        </div>
      </div>

      <div className="trust-strip">
        <ShieldCheck aria-hidden="true" />
        <div>
          <h3>Buy from approved sources</h3>
          <p>Listed official branches and authorized sellers are provided as ARP-managed content for customer guidance.</p>
        </div>
        <span>Genuine Products</span>
        <span>Authorized Partners</span>
        <span>Product Support</span>
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-select">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LocationRow({
  location,
  active,
  onClick,
}: {
  location: Location;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" className={active ? "location-row location-row-active" : "location-row"} onClick={onClick}>
      {location.image ? (
        <Image src={location.image} alt="" width={140} height={92} />
      ) : (
        <span className="reseller-logo">{location.name.slice(0, 2)}</span>
      )}
      <span>
        <strong>{location.name}</strong>
        <small>
          <MapPin size={14} /> {location.address}
        </small>
        <small>
          <Phone size={14} /> {location.phone}
        </small>
      </span>
      <em>{location.distance ?? "Call"}</em>
    </button>
  );
}

function LocationDetail({ location }: { location: Location }) {
  return (
    <article className="location-detail">
      <div>
        <span className="status-pill">{location.storeType}</span>
        <h2>{location.name}</h2>
        <p>
          <MapPin size={16} aria-hidden="true" /> {location.address}
        </p>
      </div>
      {location.image ? <Image src={location.image} alt={location.name} width={280} height={170} /> : null}
      <div className="detail-actions">
        <a className="btn btn-primary" href={`tel:${location.phone.replace(/\s/g, "")}`}>
          <Phone size={17} /> Call
        </a>
        <a className="btn btn-secondary" href={location.directionsUrl} target="_blank" rel="noopener noreferrer">
          Get Directions
        </a>
      </div>
      <div className="detail-info">
        <strong>Opening Hours</strong>
        <span>{location.hours}</span>
        <strong>Supported Brands</strong>
        <span>{location.brands.join(", ")}</span>
      </div>
    </article>
  );
}
