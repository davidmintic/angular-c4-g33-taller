import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RequestBackendService } from 'src/app/request-backend.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-dialog-usuarios',
  templateUrl: './dialog-usuarios.component.html',
  styleUrls: ['./dialog-usuarios.component.scss'],
})
export class DialogUsuariosComponent implements OnInit {
  user: any;

  formUser: FormGroup = new FormGroup({});
  modeForm = 'adicion';
  tipos = [
    {
      text: 'Propietario',
      value: 'propietario',
    },
    {
      text: 'Mecánico',
      value: 'mecanico',
    },
    {
      text: 'Jefe de operaciones',
      value: 'jefe-operaciones',
    },
    {
      text: 'Administrador',
      value: 'admin',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private servicioBackend: RequestBackendService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogUsuariosComponent>
  ) {
    this.formUser = this.fb.group({
      idUsuario: [''],
      nombre: [''],
      telefono: [''],
      tipoUsuario: [''],
      fechaNacimiento: [new Date()],
      contrasenia: ['111'],
      sedeId: ['63557cfb71cf34a13bd99ad7'],
    });

    this.sortTipos();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.data && this.data.user) {
      const user = JSON.parse(JSON.stringify(this.data.user));
      user['fechaNacimiento'] = user['fechaNacimiento'].split('T')[0];
      this.formUser.patchValue(user);
      console.log(this.data);
      this.modeForm = this.data.modeForm;
    }
  }

  sortTipos(): void {
    this.tipos.sort(function (a, b) {
      if (a.text < b.text) {
        return -1;
      }
      if (a.text > b.text) {
        return 1;
      }
      return 0;
    });
  }

  saveUser(): void {
    const datosUser = this.formUser.getRawValue();
    datosUser['fechaNacimiento'] = new Date(datosUser['fechaNacimiento']);

    console.log(datosUser);

    this.servicioBackend
      .postData('usuarios', JSON.stringify(datosUser))
      .subscribe({
        next: (data) => {
          console.log(data);
          // this.getUsers();
          Swal.fire(
            'Usuario creado',
            'Todo ha salido muy bien con la creación del usuario',
            'success'
          );
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Usuario NO creado', 'Ocurrió un error', 'error');
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  updateUser(): void {
    const newData = this.formUser.getRawValue();
    newData['fechaNacimiento'] = new Date(newData['fechaNacimiento']);

    this.servicioBackend
      .updateData('usuarios', newData.idUsuario, newData)
      .subscribe({
        next: (data) => {
          console.log(data);
          Swal.fire(
            'Usuario editado',
            'Todo ha salido muy bien con la edición del usuario',
            'success'
          );

          this.dialogRef.close(true);
        },
        error: (error) => {
          console.log(error);
          Swal.fire('Usuario NO editado', 'Ocurrió un error', 'error');
        },
        complete: () => {
          console.log('complete');
        },
      });
  }
}
