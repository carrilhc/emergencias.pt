import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {
    active: false,
  };

  toggleMenu = () => {
    this.setState((prev) => ({
      active: !prev.active,
    }));
  };

  closeMenu = () => {
    this.setState({
      active: false,
    });
  };

  render() {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0008FF] shadow-2xl backdrop-blur-lg border-b border-cyan-400/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-semibold text-xl tracking-wide text-white">
                Emergencias.pt
              </span>
            </Link>

            <div className="hidden">
              <NavLink
                to="/lista"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-lg scale-105"
                      : "text-white hover:bg-cyan-400/15 hover:scale-105"
                  }`
                }
              >
                Lista
              </NavLink>

              <NavLink
                to="/mapa"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-lg scale-105"
                      : "text-white hover:bg-cyan-400/15 hover:scale-105"
                  }`
                }
              >
                Mapa
              </NavLink>

              <NavLink
                to="/fma"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-lg scale-105"
                      : "text-white hover:bg-cyan-400/15 hover:scale-105"
                  }`
                }
              >
                FMA
              </NavLink>

              <NavLink
                to="/fma-mapa"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-lg scale-105"
                      : "text-white hover:bg-cyan-400/15 hover:scale-105"
                  }`
                }
              >
                Mapa FMA
              </NavLink>
            </div>

            <button
              onClick={this.toggleMenu}
              className="p-2 rounded-xl text-white hover:bg-cyan-400/10 transition-all duration-300"
            >
              <span className="text-2xl">{this.state.active ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            this.state.active ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#0008FF]/95 backdrop-blur-xl border-t border-cyan-400/10">
            <NavLink
              to="/lista"
              onClick={this.closeMenu}
              className={({ isActive }) =>
                `block px-6 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-400/20 text-white font-semibold"
                    : "text-white hover:bg-cyan-400/10"
                }`
              }
            >
              Lista
            </NavLink>

            <NavLink
              to="/mapa"
              onClick={this.closeMenu}
              className={({ isActive }) =>
                `block px-6 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-400/20 text-white font-semibold"
                    : "text-white hover:bg-cyan-400/10"
                }`
              }
            >
              Mapa
            </NavLink>

            <NavLink
              to="/fma"
              onClick={this.closeMenu}
              className={({ isActive }) =>
                `block px-6 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-400/20 text-white font-semibold"
                    : "text-white hover:bg-cyan-400/10"
                }`
              }
            >
              FMA
            </NavLink>

            <NavLink
              to="/fma-mapa"
              onClick={this.closeMenu}
              className={({ isActive }) =>
                `block px-6 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-400/20 text-white font-semibold"
                    : "text-white hover:bg-cyan-400/10"
                }`
              }
            >
              Mapa FMA
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
