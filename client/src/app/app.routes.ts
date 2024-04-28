import { Routes } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { ResearcherComponent } from './researcher/researcher.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
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
