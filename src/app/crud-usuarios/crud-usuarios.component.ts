import { Component, OnInit } from "@angular/core";
import { RequestBackendService } from "../request-backend.service";

@Component({
  selector: "crud-usuarios",
  templateUrl: "./crud-usuarios.component.html",
  styleUrls: ["./crud-usuarios.component.scss"],
})
export class CrudUsuariosComponent implements OnInit {
  titulo = "Hola";

  value = "";

  edad = 0;
  nombreUsuarioSeleccionado = "";

  displayedColumns: string[] = [
    "nombre",
    "telefono",
    "fechaNacimiento",
    "tipoUsuario",
  ];
  dataSource: any = [];

  constructor(private servicioBackend: RequestBackendService) {
    this.servicioBackend.getData("usuarios").subscribe(
      (data) => {
        this.dataSource = data;
      },

      (error) => {
        console.log(error);
        this.dataSource = [];
      }
    );
  }

  ngOnInit(): void {}

  // cambiarTitulo(): void {
  //   this.titulo = 'He cambiado de nombre, ahora me llamo de Maicol';
  // }

  focusBuscar(): void {
    console.log("hizo focus");
  }

  blurBuscar(): void {
    console.log("salio del focus");
  }

  seleccionarNombre(nombreNuevo: string): void {
    this.nombreUsuarioSeleccionado = nombreNuevo;
  }

  cambiarNombreUsuario(nombreNuevo: string): void {
    for (const key in this.dataSource) {
      if (this.dataSource[key].name == this.nombreUsuarioSeleccionado) {
        this.dataSource[key].name = nombreNuevo;
        return;
      }
    }
  }
}
