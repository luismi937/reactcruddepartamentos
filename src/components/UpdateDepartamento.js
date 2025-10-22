// Importo React y Component porque voy a crear un componente de clase
import React, { Component } from "react";

// Importo Navigate para poder redirigir al usuario después de actualizar un departamento
import { Navigate } from "react-router-dom";

// Importo mi archivo Global donde tengo guardada la URL base de la API
import Global from "../Global";

// Importo axios para realizar las peticiones HTTP
import axios from "axios";

// Defino mi componente de clase llamado UpdateDepartamento
export default class UpdateDepartamento extends Component {
  // Guardo la URL base de mi API en una propiedad para poder reutilizarla fácilmente
  url = Global.apiDepartamentos;

  // Creo referencias a los campos del formulario
  // Así puedo acceder directamente a los valores introducidos por el usuario
  cajaId = React.createRef();
  cajaNombre = React.createRef();
  cajaLocalidad = React.createRef();

  // Método que se ejecuta cuando el usuario hace clic en el botón para actualizar el departamento
  updateDepartamento = (event) => {
    // Evito que el formulario recargue la página
    event.preventDefault();

    // Defino la parte final del endpoint que se usa para actualizar los datos
    let request = "api/departamentos";

    // Obtengo el id del campo correspondiente y lo convierto a número
    let id = parseInt(this.cajaId.current.value);

    // Creo el objeto departamento con los datos actualizados del formulario
    let departamento = {
      numero: id,
      nombre: this.cajaNombre.current.value,
      localidad: this.cajaLocalidad.current.value,
    };

    // Hago la petición PUT a mi API para actualizar el departamento
    axios.put(this.url + request, departamento).then((response) => {
      // Muestro en consola que el registro fue actualizado correctamente
      console.log("Updated");

      // Actualizo el estado para que el componente redirija al usuario al Home
      this.setState({
        status: true,
      });
    });
  };

  // Defino el estado inicial: false significa que todavía no se ha actualizado nada
  state = {
    status: false,
  };

  // Método render: aquí defino el HTML que se mostrará en pantalla
  render() {
    return (
      <div style={{ margin: "auto", width: "50%" }}>
        {/* Si el estado es true, redirijo al usuario a la página principal */}
        {this.state.status == true && <Navigate to="/" />}

        <h1>Update Departamento</h1>

        {/* Formulario para actualizar los datos de un departamento */}
        <form>
          {/* Campo del Id, lo dejo deshabilitado para que no se pueda modificar */}
          <label>Id departamento</label>
          <input
            type="text"
            ref={this.cajaId}
            className="form-control"
            defaultValue={this.props.id}
            disabled
          />

          {/* Campo para modificar el nombre */}
          <label>Nombre</label>
          <input
            type="text"
            ref={this.cajaNombre}
            className="form-control"
            defaultValue={this.props.nombre}
          />

          {/* Campo para modificar la localidad */}
          <label>Localidad</label>
          <input
            type="text"
            ref={this.cajaLocalidad}
            className="form-control"
            defaultValue={this.props.localidad}
          />

          {/* Botón que ejecuta la función updateDepartamento cuando se hace clic */}
          <button className="btn btn-info" onClick={this.updateDepartamento}>
            Update
          </button>
        </form>
      </div>
    );
  }
}
