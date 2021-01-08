import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarComponent } from "./calendar.component";
import { ModalModule } from "ngx-bootstrap/modal";

import { RouterModule } from "@angular/router";
import { CalendarRoutes } from "./calendar.routing";

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CalendarRoutes),
    ModalModule.forRoot()
  ]
})
export class CalendarModule {}
