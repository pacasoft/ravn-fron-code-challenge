import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SettingsComponent } from '../settings/settings.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
const routes: Routes = [
  // { path: 'login', component: LoginComponent, data: { title: 'Login' } },

  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'settings', component: SettingsComponent, data: { title: 'Settings' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserModuleRoutingModule { }
