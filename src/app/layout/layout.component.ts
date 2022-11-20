import { Component, OnInit } from "@angular/core";
import { LayoutService } from "../layout.service";

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  constructor(public servicioLayout: LayoutService) {}

  ngOnInit(): void {}
}
