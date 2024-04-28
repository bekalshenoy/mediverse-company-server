import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { ResearcherComponent } from './researcher/researcher.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'patient',
    component: PatientComponent,
  },
  {
    path: 'researcher',
    component: ResearcherComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
];
