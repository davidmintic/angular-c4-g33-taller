import { Component, OnInit } from '@angular/core';
import { RequestBackendService } from '../request-backend.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsuariosComponent } from './dialog-usuarios/dialog-usuarios.component';
import { format } from 'date-fns';
import { ComunicadorService } from '../comunicador.service';

@Component({
  selector: 'crud-usuarios',
  templateUrl: './crud-usuarios.component.html',
  styleUrls: ['./crud-usuarios.component.scss'],
})
export class CrudUsuariosComponent implements OnInit {
  titulo = 'Hola';

  modeForm = 'adicion';

  value = '';

  edad = 0;
  nombreUsuarioSeleccionado = '';

  displayedColumns: string[] = [
    'nombre',
    'telefono',
    'tipoUsuario',
    'fechaNacimiento',
    'acciones',
  ];
  datos = [];

  formUser: FormGroup = new FormGroup({});

  showForm = false;

  constructor(
    private servicioBackend: RequestBackendService,
    private comunicador: ComunicadorService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.getUsers();
    this.comunicador.titulo = 'Hola soy crud usuarios';

    this.formUser = this.fb.group({
      nombre: [''],
      telefono: [''],
      tipoUsuario: [''],
      fechaNacimiento: ['2022-11-08T00:22:27.812Z'],
      contrasenia: ['111'],
      sedeId: ['63557cfb71cf34a13bd99ad7'],
    });
  }

  ngOnInit(): void {}

  // cambiarTitulo(): void {
  //   this.titulo = 'He cambiado de nombre, ahora me llamo de Maicol';
  // }

  focusBuscar(): void {
    console.log('hizo focus');
  }

  blurBuscar(): void {
    console.log('salio del focus');
  }

  seleccionarNombre(nombreNuevo: string): void {
    this.nombreUsuarioSeleccionado = nombreNuevo;
  }

  getUsers(): void {
    this.servicioBackend.getData('usuarios').subscribe(
      (data) => {
        console.log(data);
        this.datos = data;
      },

      (error) => {
        console.log('Error: ' + error);
      }
    );
  }

  changeShowForm() {
    this.modeForm = 'adicion';
    this.showForm = !this.showForm;
  }

  deleteUser(code: string): void {
    console.log(code);

    Swal.fire({
      title: '¿Está seguro de eliminar el usuario?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      // denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.servicioBackend.deleteData('usuarios', code).subscribe({
          next: (data) => {
            this.getUsers();
            Swal.fire('Ok!', 'Eliminado', 'success');
          },
          error: (error) => {
            console.log(error);
            Swal.fire('Usuario NO eliminado', 'Ocurrió un error', 'error');
          },
          complete: () => {
            console.log('complete');
          },
        });
      }
    });
  }

  selectUserEdit(user: any): void {
    this.showForm = true;
    this.modeForm = 'edicion';
    this.formUser.patchValue(user);
  }

  openDialogAdd() {
    const dialogRef = this.dialog.open(DialogUsuariosComponent, {
      data: {
        modeForm: 'adicion',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  openDialogEdit(user?: string) {
    const dialogRef = this.dialog.open(DialogUsuariosComponent, {
      data: {
        user: user,
        modeForm: 'edicion',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getUsers();
      }
    });
  }

  setFormat(dateSting: string): string {
    const date = new Date(dateSting);
    const newDate = format(date, 'd LLL yyyy');
    return newDate;
  }

  filtrar() {
    this.servicioBackend
      .getDataFilter('usuarios', this.value, 'nombre')
      .subscribe(
        (data) => {
          this.datos = data;
        },

        (error) => {
          console.log('Error: ' + error);
        }
      );
  }
}
