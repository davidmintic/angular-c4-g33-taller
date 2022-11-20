import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../layout.service";

@Component({
  selector: "crud-vehiculos",
  templateUrl: "./crud-vehiculos.component.html",
  styleUrls: ["./crud-vehiculos.component.scss"],
})
export class CrudVehiculosComponent implements OnInit {
  constructor(private comunicador: LayoutService) {}

  ngOnInit(): void {
    this.comunicador.titulo = "";
  }
}
