import { Routes } from "@angular/router";

import { SmsComponent } from "./sms.component";

export const SmsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SmsComponent
      }
    ]
  }
];
