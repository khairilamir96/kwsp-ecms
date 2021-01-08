import { Routes } from "@angular/router";

import { LaporanComponent } from "./laporan.component";

export const LaporanRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: LaporanComponent
      }
    ]
  }
];
