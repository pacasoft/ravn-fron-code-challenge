import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
loadDevMessages();
loadErrorMessages();