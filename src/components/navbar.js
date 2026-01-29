// NavBar.jsx
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    state = { active: false };
    addActiveClass = () => this.setState((s) => ({ active: !s.active }));

    render() {
        return (
            <nav className="fixed inset-x-0 top-0 bg-blue-500 h-16 z-[1000] w-screen">
                <div className="max-w-6xl mx-auto px-4 h-16">
                    <div className="flex justify-between h-16">
                        <div className="flex space-x-4">
                            <div className="flex items-center">
                                <Link to="/" className="flex items-center py-5 px-2 text-white hover:text-gray-300">
                                    <span className="font-bold">Emergencias.pt</span>
                                </Link>
                            </div>
                            <div className="hidden md:flex items-center space-x-1">
                                <Link className="py-5 px-3 text-white hover:text-gray-300" to="/lista">Lista</Link>
                                <Link className="py-5 px-3 text-white hover:text-gray-300" to="/mapa">Mapa</Link>
                                <Link className="py-5 px-3 text-white hover:text-gray-300" to="/fma">FMA</Link>
                                <Link className="py-5 px-3 text-white hover:text-gray-300" to="/fma-mapa">Mapa FMA</Link>
                            </div>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button className="mobile-menu-button text-white text-2xl" onClick={this.addActiveClass}>
                                ☰
                            </button>
                        </div>
                    </div>
                </div>

                {/* dropdown mobile, aparece IMEDIATAMENTE por baixo da navbar */}
                <div
                    className={
                        this.state.active
                            ? 'md:hidden fixed inset-x-0 top-16 bg-white shadow z-40'
                            : 'hidden'
                    }
                >
                    <Link to="/lista" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={this.addActiveClass}>Lista</Link>
                    <Link to="/mapa" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={this.addActiveClass}>Mapa</Link>
                    <Link to="/fma" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={this.addActiveClass}>FMA</Link>
                    <Link to="/fma-mapa" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={this.addActiveClass}>Mapa FMA</Link>
                </div>
            </nav>
        );
    }
}

export default NavBar;
