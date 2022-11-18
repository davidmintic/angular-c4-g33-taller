import { Component, OnInit } from '@angular/core';
import { ComunicadorService } from '../comunicador.service';

@Component({
  selector: 'crud-vehiculos',
  templateUrl: './crud-vehiculos.component.html',
  styleUrls: ['./crud-vehiculos.component.scss'],
})
export class CrudVehiculosComponent implements OnInit {
  constructor(private comunicador: ComunicadorService) {}

  ngOnInit(): void {
    this.comunicador.titulo = '';
  }
}
