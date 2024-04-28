import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { MedicalReport, Patient, Report, Role, User } from './types';
import { ApiService } from './api.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css',
})
export class PatientComponent implements OnInit {
  patient: WritableSignal<Patient> = signal({} as Patient);
  dob: WritableSignal<string> = signal('');
  password: WritableSignal<string> = signal('');
  hospitals: WritableSignal<User[]> = signal([]);
  reports: WritableSignal<Report[]> = signal([]);
  medicalReport: WritableSignal<MedicalReport> = signal({} as MedicalReport);
  currentSection: WritableSignal<number> = signal(1);
  addMember: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(12),
  ]);
  deleteMember: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(12),
    Validators.minLength(12),
  ]);

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    if (sessionStorage.getItem('role') !== Role.PATIENT) {
      this.router.navigate(['/']);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.apiService.getPatient().then((patient) => {
      this.patient.set(patient);
    });

    await this.apiService.getHospitals().then((hospitals) => {
      this.hospitals.set(hospitals);
    });

    this.dob.set(sessionStorage.getItem('dob') as string);
    this.password.set(sessionStorage.getItem('password') as string);
  }

  async addFamilyMember(): Promise<void> {
    if (this.addMember.invalid) {
      alert(this.addMember.errors);
    } else {
      await this.apiService.addFamilyMember(this.addMember.value);
      this.addMember.reset();
      this.patient.set(await this.apiService.getPatient());
    }
  }

  async deleteFamilyMember(): Promise<void> {
    if (this.deleteMember.invalid) {
      alert(this.deleteMember.errors);
    } else {
      await this.apiService.deleteFamilyMember(this.deleteMember.value);
      this.deleteMember.reset();
      this.patient.set(await this.apiService.getPatient());
    }
  }

  async getReports(userId: string): Promise<void> {
    this.reports.set(await this.apiService.getReports(userId));
  }

  async getMedicalReport(reportId: string): Promise<void> {
    this.medicalReport.set(
      await this.apiService.getMedicalReport(
        reportId,
        this.dob(),
        this.password(),
      ),
    );
  }
}
