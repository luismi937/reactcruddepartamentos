import React, { Component } from "react";

import { Navigate } from "react-router-dom";

import Global from "../Global";

import axios from "axios";

export default class UpdateDepartamento extends Component {
  url = Global.apiDepartamentos;

  cajaId = React.createRef();

  cajaNombre = React.createRef();

  cajaLocalidad = React.createRef();

  updateDepartamento = (event) => {
    event.preventDefault();

    let request = "api/departamentos";

    let id = parseInt(this.cajaId.current.value);

    let departamento = {
      numero: id,

      nombre: this.cajaNombre.current.value,

      localidad: this.cajaLocalidad.current.value,
    };

    axios.put(this.url + request, departamento).then((response) => {
      console.log("Updated");

      this.setState({
        status: true,
      });
    });
  };

  state = {
    status: false,
  };

  render() {
    return (
      <div style={{ margin: "auto", width: "50%" }}>
        {this.state.status == true && <Navigate to="/" />}

        <h1>Update Departamento</h1>

        <form>
          <label>Id departamento</label>

          <input
            type="text"
            ref={this.cajaId}
            className="form-control"
            defaultValue={this.props.id}
            disabled
          />

          <label>Nombre</label>

          <input
            type="text"
            ref={this.cajaNombre}
            className="form-control"
            defaultValue={this.props.nombre}
          />

          <label>Localidad</label>

          <input
            type="text"
            ref={this.cajaLocalidad}
            className="form-control"
            defaultValue={this.props.localidad}
          />

          <button className="btn btn-info" onClick={this.updateDepartamento}>
            Update
          </button>
        </form>
      </div>
    );
  }
}
