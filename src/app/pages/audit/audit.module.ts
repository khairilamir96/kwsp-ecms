import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ComponentsModule } from "../../components/components.module";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxPrintModule } from "ngx-print";

import { AuditComponent } from "./audit.component";
import { RouterModule } from "@angular/router";
import { AuditRoutes } from "./audit.routing";

@NgModule({
  declarations: [AuditComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AuditRoutes),
    NgxDatatableModule,
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    NgxPrintModule,
    ComponentsModule
  ]
})
export class AuditModule {}
