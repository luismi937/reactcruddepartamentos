// Importo React y Component, ya que estoy creando un componente de clase
import React, { Component } from "react";

// Importo una imagen que usaré mientras se cargan los datos
import loadingImage from "./../images/loading.jfif";

// Importo mi clase Global donde tengo guardada la URL base de mi API
import Global from "../Global";

// Importo axios para hacer las peticiones HTTP a mi API
import axios from "axios";

// Importo NavLink para poder navegar entre rutas dentro de mi aplicación React
import { NavLink } from "react-router-dom";

// Defino mi componente de clase llamado HomeDepartamentos
export default class HomeDepartamentos extends Component {
  // Asigno la URL base de mi API desde el objeto Global
  url = Global.apiDepartamentos;

  // Defino el estado inicial del componente
  // status: false significa que los datos aún no se han cargado
  // departamentos: [] es el array donde guardaré los datos que vienen del servidor
  state = {
    status: false,
    departamentos: [],
  };

  // Creo un método para cargar los departamentos desde la API
  loadDepartamentos = () => {
    // Defino la parte final del endpoint
    let request = "api/departamentos";

    // Realizo la petición GET usando axios
    axios.get(this.url + request).then((response) => {
      // Muestro en consola que se están leyendo los datos
      console.log("Leyendo departamentos");

      // Actualizo el estado con los datos obtenidos y cambio el status a true
      this.setState({
        status: true,
        departamentos: response.data,
      });
    });
  };

  // Este método se ejecuta automáticamente cuando el componente se monta
  // Aquí llamo a mi función para cargar los departamentos
  componentDidMount = () => {
    this.loadDepartamentos();
  };

  // Creo una función para eliminar un departamento
  deleteDepartamento = (id) => {
    // Construyo el endpoint concatenando el id del departamento
    let request = "api/departamentos/" + id;

    // Realizo una petición DELETE a la API
    axios.delete(this.url + request).then((response) => {
      // Muestro en consola que el departamento fue eliminado
      console.log("Departamento eliminado");

      // Después de eliminar, vuelvo a cargar la lista actualizada
      this.loadDepartamentos();
    });
  };

  // Método render: es el que dibuja el contenido en pantalla
  render() {
    // Si todavía no se han cargado los datos, muestro una imagen de carga
    if (this.state.status === false) {
      return (
        <div style={{ margin: "auto", width: "50%" }}>
          <img src={loadingImage} alt="loading..." />
        </div>
      );
    } else {
      // Si los datos ya están cargados, muestro la tabla con los departamentos
      return (
        <div style={{ margin: "auto", width: "50%" }}>
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Localidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Recorro el array de departamentos y pinto una fila por cada uno */}
              {this.state.departamentos.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.numero}</td>
                  <td>{dept.nombre}</td>
                  <td>{dept.localidad}</td>
                  <td>
                    {/* Botón para eliminar un departamento */}
                    <button
                      onClick={() => this.deleteDepartamento(dept.numero)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    &nbsp;
                    {/* Enlace que me lleva al formulario para actualizar el departamento */}
                    <NavLink
                      className="btn btn-info"
                      to={
                        "/update/" +
                        dept.numero +
                        "/" +
                        dept.nombre +
                        "/" +
                        dept.localidad
                      }
                    >
                      update
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
