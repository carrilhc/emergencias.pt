import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchIncidents, sortIncidents } from "../actions/clientActions";
import OcorrenciasCard from "./OcorrenciasCard";

const FILTER_KEY = {
  Distrito: "district",
  Concelho: "concelho",
  Freguesia: "freguesia",
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastSort: 1,
      activeFilter: "Distrito",
      filterValue: "all",
    };
  }

  componentDidMount() {
    this.props.fetchIncidents();
    const queryString = require("query-string");
    const parsed = queryString.parse(window.location.search);
    if (parsed.concelho) {
      this.setState({ activeFilter: "Concelho", filterValue: parsed.concelho });
    }
  }

  getStatusColor(status) {
    switch (status) {
      case "Chegada ao TO":
      case "Despacho de 1º Alerta":
      case "Despacho":
        return "relative inline-block px-3 py-1 font-semibold text-yellow-900 leading-tight";
      case "Em Curso":
        return "relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight";
      case "Conclusão":
      case "Em Resolução":
        return "relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight";
      case "Vigilância":
        return "relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight";
      default:
        return "relative inline-block px-3 py-1 font-semibold text-grey-900 leading-tight";
    }
  }

  getStatusBg(status) {
    switch (status) {
      case "Chegada ao TO":
      case "Despacho de 1º Alerta":
      case "Despacho":
        return "absolute inset-0 bg-yellow-200 opacity-50 rounded-full";
      case "Em Curso":
        return "absolute inset-0 bg-red-200 opacity-50 rounded-full";
      case "Conclusão":
      case "Em Resolução":
        return "absolute inset-0 bg-green-200 opacity-50 rounded-full";
      case "Vigilância":
        return "absolute inset-0 bg-blue-200 opacity-50 rounded-full";
      default:
        return "absolute inset-0 bg-grey-200 opacity-50 rounded-full";
    }
  }

  sortTable(field) {
    this.props.sortIncidents(field, this.state.lastSort);
    this.setState({ lastSort: -1 * this.state.lastSort });
  }

  handleFilterChange(filter) {
    this.setState({ activeFilter: filter, filterValue: "all" });
  }

  handleSelectChange(event) {
    this.setState({ filterValue: event.target.value });
  }

  render() {
    const { incidents } = this.props.incidents;
    const { activeFilter, filterValue } = this.state;
    const filterKey = FILTER_KEY[activeFilter];

    // Totais (sempre sobre todos os incidentes)
    let totalIncidents = incidents.length;
    let totalMan = incidents.reduce((s, i) => s + (i.man || 0), 0);
    let totalTerrain = incidents.reduce((s, i) => s + (i.terrain || 0), 0);
    let totalAerial = incidents.reduce((s, i) => s + (i.aerial || 0), 0);
    let totalBoat = incidents.reduce((s, i) => s + (i.meios_aquaticos || 0), 0);

    // Opções do filtro ativo
    const filterOptions = [
      ...new Set(incidents.map((i) => i[filterKey]).filter(Boolean)),
    ].sort();

    // Ocorrências filtradas para a tabela
    const filtered =
      filterValue === "all"
        ? incidents
        : incidents.filter((i) => i[filterKey] === filterValue);

    return (
      <div className="shadow-lg mx-auto bg-white mt-24 md:mt-16 w-screen overflow-x-hidden">
        <div className="container md:my-12 mx-auto px-4 md:px-8">
          {/* Card de resumo */}
          <div className="w-full mb-8">
            <OcorrenciasCard
              totalIncidents={totalIncidents}
              totalMan={totalMan}
              totalTerrain={totalTerrain}
              totalAerial={totalAerial}
              totalBoat={totalBoat}
              activeFilter={activeFilter}
              onFilterChange={(f) => this.handleFilterChange(f)}
            />
          </div>

          {/* Filtro por select */}
          <div className="mb-6 max-w-sm">
            <label className="block text-sm text-gray-500 mb-1">
              Filtrar por {activeFilter}
            </label>
            <select
              className="w-full h-10 pl-3 pr-6 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={filterValue}
              onChange={(e) => this.handleSelectChange(e)}
            >
              <option value="all">Todos</option>
              {filterOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabela */}
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-x-scroll max-w-full">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  {[
                    ["dateTime", "Início"],
                    ["status", "Estado"],
                    ["sub_regiao", "Sub região"],
                    ["district", "Distrito"],
                    ["concelho", "Concelho"],
                    ["freguesia", "Freguesia"],
                    ["localidade", "Localidade"],
                    ["natureza", "Natureza"],
                    ["man", "🧑‍🚒"],
                    ["terrain", "🚒"],
                    ["aerial", "🚁"],
                    ["meios_aquaticos", "⛵"],
                  ].map(([field, label]) => (
                    <th
                      key={field}
                      className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      <button
                        type="button"
                        onClick={() => this.sortTable(field)}
                      >
                        {label}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((incident) => (
                  <tr key={incident.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.date} {incident.hour}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={this.getStatusColor(incident.status)}>
                        <span
                          aria-hidden
                          className={this.getStatusBg(incident.status)}
                        />
                        <span className="relative">{incident.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.sub_regiao}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.district}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.concelho}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.freguesia}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.localidade}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.natureza}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.man}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.terrain}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.aerial}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {incident.meios_aquaticos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  fetchIncidents: PropTypes.func.isRequired,
  incidents: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ incidents: state.incidents });
export default connect(mapStateToProps, { fetchIncidents, sortIncidents })(
  List,
);
