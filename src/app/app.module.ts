import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CrudUsuariosComponent } from "./crud-usuarios/crud-usuarios.component";
import { CrudVehiculosComponent } from "./crud-vehiculos/crud-vehiculos.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { LayoutComponent } from "./layout/layout.component";
import { ToolbarComponent } from "./layout/toolbar/toolbar.component";
import { SidebarComponent } from "./layout/sidebar/sidebar.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { ContentComponent } from "./layout/content/content.component";

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { EditorNombreComponent } from "./crud-usuarios/editor-nombre/editor-nombre.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    CrudUsuariosComponent,
    CrudVehiculosComponent,
    LayoutComponent,
    ToolbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    EditorNombreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
