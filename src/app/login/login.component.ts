import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  formCredenciales: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.formCredenciales = this.fb.group({
      correo: ["", Validators.required],
      contrasenia: ["", Validators.required],
    });
  }

  ngOnInit(): void {}
}
