import { Routes } from "@angular/router";

import { AuditComponent } from "./audit.component";

export const AuditRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: AuditComponent
      }
    ]
  }
];
