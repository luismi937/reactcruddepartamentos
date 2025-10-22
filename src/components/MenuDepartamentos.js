// Importo React y Component porque estoy creando un componente de clase
import React, { Component } from "react";

// Importo NavLink para poder navegar entre las diferentes rutas de mi aplicación
import { NavLink } from "react-router-dom";

// Defino mi componente de clase llamado MenuDepartamentos
export default class MenuDepartamentos extends Component {
  // El método render se encarga de devolver el contenido HTML que quiero mostrar
  render() {
    return (
      <div>
        {/* Aquí defino una barra de navegación (navbar) utilizando Bootstrap */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          
          {/* Este es el nombre o logo de mi aplicación que lleva a la página principal */}
          <NavLink className="navbar-brand" to="/">
            Departamentos
          </NavLink>

          {/* Este botón aparece en pantallas pequeñas (móviles) 
              y permite desplegar o contraer el menú */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Aquí defino la parte colapsable del menú, 
              que contiene los enlaces de navegación */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              
              {/* Primer enlace: lleva al Home (listado de departamentos) */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>

              {/* Segundo enlace: lleva al formulario para crear un nuevo departamento */}
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">
                  Crear Departamento
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

