import React, { Component } from "react";
import loadingImage from "./../images/loading.jfif";
import Global from "../Global";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default class HomeDepartamentos extends Component {
  url = Global.apiDepartamentos;

  state = {
    status: false,
    departamentos: [],
  };

  loadDepartamentos = () => {
    let request = "api/departamentos";

    axios.get(this.url + request).then((response) => {
      console.log("Leyendo departamentos");
      this.setState({
        status: true,
        departamentos: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadDepartamentos();
  };

  deleteDepartamento = (id) => {
    let request = "api/departamentos/" + id;
    axios.delete(this.url + request).then((response) => {
      console.log("Departamento eliminado");
      this.loadDepartamentos();
    });
  };

  render() {
    if (this.state.status === false) {
      return (
        <div style={{ margin: "auto", width: "50%" }}>
          <img src={loadingImage} alt="loading..." />
        </div>
      );
    } else {
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
              {this.state.departamentos.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.numero}</td>
                  <td>{dept.nombre}</td>
                  <td>{dept.localidad}</td>
                  <td>
                    <button
                      onClick={() => this.deleteDepartamento(dept.numero)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    &nbsp;
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
