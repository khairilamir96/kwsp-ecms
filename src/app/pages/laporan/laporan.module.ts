import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../../components/components.module";
import { FormsModule } from "@angular/forms";
import { TagInputModule } from "ngx-chips";
import { BsDropdownModule } from "ngx-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

import { LaporanComponent } from "./laporan.component";
import { RouterModule } from "@angular/router";
import { LaporanRoutes } from "./laporan.routing";

@NgModule({
  declarations: [LaporanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LaporanRoutes),
    FormsModule,
    TagInputModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ComponentsModule
  ]
})
export class LaporanModule {}
