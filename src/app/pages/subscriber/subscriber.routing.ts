import { Routes } from "@angular/router";

import { SubscriberComponent } from "./subscriber.component";

export const SubscriberRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: SubscriberComponent
      }
    ]
  }
];
