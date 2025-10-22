import React, { Component } from "react";

import axios from "axios";

import Global from "../Global";

import { Navigate } from "react-router-dom";

export default class CreateDepartamento extends Component {
  url = Global.apiDepartamentos;

  cajaNumero = React.createRef();

  cajaNombre = React.createRef();

  cajaLocalidad = React.createRef();

  state = {
    status: false,
  };

  insertDepartamento = (event) => {
    event.preventDefault();

    let request = "api/departamentos";

    let id = parseInt(this.cajaNumero.current.value);

    let departamento = {
      numero: id,

      nombre: this.cajaNombre.current.value,

      localidad: this.cajaLocalidad.current.value,
    };

    axios.post(this.url + request, departamento).then((response) => {
      console.log("Insertado");

      this.setState({
        status: true,
      });
    });
  };

  render() {
    return (
      <div style={{ margin: "auto", width: "50%" }}>
        {this.state.status == true && <Navigate to="/" />}

        <h1>Create Departamento</h1>

        <form>
          <label>Id departamento</label>

          <input type="text" ref={this.cajaNumero} className="form-control" />

          <label>Nombre</label>

          <input type="text" ref={this.cajaNombre} className="form-control" />

          <label>Localidad</label>

          <input
            type="text"
            ref={this.cajaLocalidad}
            className="form-control"
          />

          <button className="btn btn-info" onClick={this.insertDepartamento}>
            Nuevo departamento
          </button>
        </form>
      </div>
    );
  }
}
