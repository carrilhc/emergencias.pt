import React from "react";
import PropTypes from "prop-types";

const FILTERS = ["Distrito", "Concelho"];

function ResourceCell({ emoji, count, label }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-4"
      style={{ background: "#f3f3f3" }}
    >
      <span style={{ fontSize: "2.5rem", lineHeight: 1, flexShrink: 0 }}>
        {emoji}
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-bold text-gray-900 leading-tight">
          {count}
        </p>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5 truncate">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function OcorrenciasCard({
  totalIncidents,
  totalMan,
  totalTerrain,
  totalAerial,
  totalBoat,
  activeFilter,
  onFilterChange,
}) {
  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col gap-4 w-full"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-800 uppercase tracking-widest">
          Total Ocorrências
        </span>
        <span
          className="text-xs font-bold text-white uppercase tracking-wider rounded-full px-4 py-1.5 flex-shrink-0"
          style={{ background: "#c0392b" }}
        >
          Em Curso
        </span>
      </div>

      {/* Número principal */}
      <div>
        <p
          className="font-bold leading-none"
          style={{ fontSize: "5.5rem", color: "#c0392b" }}
        >
          {totalIncidents}
        </p>
        <p className="text-sm text-gray-400 mt-2">Hoje - Atualizado agora</p>
      </div>

      <hr className="border-gray-200" />

      {/* Recursos */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Por Recursos
        </p>
        <div className="grid grid-cols-2 gap-3">
          <ResourceCell emoji="🧑‍🚒" count={totalMan} label="Operacionais" />
          <ResourceCell emoji="🚒" count={totalTerrain} label="Veículos" />
          <ResourceCell emoji="🚁" count={totalAerial} label="Aéreos" />
          <ResourceCell emoji="⛵" count={totalBoat} label="Aquáticos" />
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Filtros */}
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          Filtrar Por
        </p>
        <div className="flex gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className="flex-1 py-4 font-bold uppercase tracking-widest rounded-2xl transition-colors"
              style={{
                fontSize: "0.85rem",
                background: activeFilter === f ? "#1a1a1a" : "transparent",
                color: activeFilter === f ? "#fff" : "#1a1a1a",
                border: "2.5px solid #1a1a1a",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Ver mais */}
      <a
        href="/lista"
        className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-800 transition-colors pt-1"
      >
        Ver Todas as Ocorrências
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

OcorrenciasCard.propTypes = {
  totalIncidents: PropTypes.number.isRequired,
  totalMan: PropTypes.number.isRequired,
  totalTerrain: PropTypes.number.isRequired,
  totalAerial: PropTypes.number.isRequired,
  totalBoat: PropTypes.number.isRequired,
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
