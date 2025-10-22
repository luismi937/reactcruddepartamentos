// Importo React y Component porque voy a crear un componente de clase
import React, { Component } from "react";

// Importo axios para poder hacer peticiones HTTP a mi API
import axios from "axios";

// Importo mi archivo Global, donde tengo guardada la URL base de la API
import Global from "../Global";

// Importo Navigate para poder redirigir al usuario después de crear un departamento
import { Navigate } from "react-router-dom";

// Defino mi componente de clase CreateDepartamento
export default class CreateDepartamento extends Component {
  // Guardo la URL base de mi API en una propiedad para poder reutilizarla fácilmente
  url = Global.apiDepartamentos;

  // Creo referencias a los inputs del formulario
  // Así puedo acceder directamente a sus valores sin usar un estado controlado
  cajaNumero = React.createRef();
  cajaNombre = React.createRef();
  cajaLocalidad = React.createRef();

  // Defino el estado inicial del componente
  // status: false indica que todavía no se ha insertado ningún departamento
  state = {
    status: false,
  };

  // Método que se ejecuta cuando el usuario hace clic en el botón para crear un departamento
  insertDepartamento = (event) => {
    // Prevengo el comportamiento por defecto del formulario (recargar la página)
    event.preventDefault();

    // Defino la parte final del endpoint para insertar departamentos
    let request = "api/departamentos";

    // Obtengo los valores introducidos en los inputs usando las referencias
    let id = parseInt(this.cajaNumero.current.value);
    let departamento = {
      numero: id,
      nombre: this.cajaNombre.current.value,
      localidad: this.cajaLocalidad.current.value,
    };

    // Realizo la petición POST a la API para insertar el nuevo departamento
    axios.post(this.url + request, departamento).then((response) => {
      // Muestro en consola que la inserción se ha realizado correctamente
      console.log("Insertado");

      // Cambio el estado a true para que se active la redirección
      this.setState({
        status: true,
      });
    });
  };

  // Método render: es el encargado de mostrar el contenido en pantalla
  render() {
    return (
      <div style={{ margin: "auto", width: "50%" }}>
        {/* Si el estado 'status' es true, redirijo automáticamente al usuario a la página principal */}
        {this.state.status == true && <Navigate to="/" />}

        <h1>Create Departamento</h1>

        {/* Formulario para crear un nuevo departamento */}
        <form>
          {/* Campo para introducir el número del departamento */}
          <label>Id departamento</label>
          <input type="text" ref={this.cajaNumero} className="form-control" />

          {/* Campo para introducir el nombre del departamento */}
          <label>Nombre</label>
          <input type="text" ref={this.cajaNombre} className="form-control" />

          {/* Campo para introducir la localidad del departamento */}
          <label>Localidad</label>
          <input
            type="text"
            ref={this.cajaLocalidad}
            className="form-control"
          />

          {/* Botón que ejecuta el método insertDepartamento al hacer clic */}
          <button className="btn btn-info" onClick={this.insertDepartamento}>
            Nuevo departamento
          </button>
        </form>
      </div>
    );
  }
}
