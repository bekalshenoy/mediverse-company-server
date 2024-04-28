import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Hospital, Model, Researcher, User } from './types';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Role } from '../login/api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit {
  hospitals: WritableSignal<User[]> = signal([]);
  researchers: WritableSignal<User[]> = signal([]);
  models: WritableSignal<Model[]> = signal([]);
  currentSection: WritableSignal<number> = signal(1);
  hospitalForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    location: new FormControl('', [Validators.required]),
    server: new FormControl('', [Validators.required]),
  });
  researcherForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(12),
      Validators.minLength(10),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    location: new FormControl('', [Validators.required]),
  });
  modelForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    cost: new FormControl(0, [
      Validators.required,
      Validators.max(10),
      Validators.min(0),
    ]),
    server: new FormControl('', [Validators.required]),
    researcherId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    if (sessionStorage.getItem('role') !== Role.ADMIN) {
      this.router.navigate(['/']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.hospitals.set(await this.apiService.getHospitals());
    this.researchers.set(await this.apiService.getResearchers());
    this.models.set(await this.apiService.getModels());
  }

  async deleteHospital(userId: string): Promise<void> {
    await this.apiService.removeUser(userId);
    this.hospitals.set(await this.apiService.getHospitals());
  }

  async deleteResearcher(userId: string): Promise<void> {
    await this.apiService.removeUser(userId);
    this.researchers.set(await this.apiService.getResearchers());
  }

  async deleteModel(modelId: number): Promise<void> {
    await this.apiService.deleteModel(modelId);
    this.models.set(await this.apiService.getModels());
  }

  async addHospital(): Promise<void> {
    if (this.hospitalForm.invalid) {
      alert(this.hospitalForm.errors);
    } else {
      await this.apiService.addHospital(this.hospitalForm.value as Hospital);
      this.hospitalForm.reset();
      this.hospitals.set(await this.apiService.getHospitals());
    }
  }

  async addResearcher(): Promise<void> {
    if (this.researcherForm.invalid) {
      alert(this.researcherForm.errors);
    } else {
      await this.apiService.addResearcher(
        this.researcherForm.value as Researcher,
      );
      this.researcherForm.reset();
      this.researchers.set(await this.apiService.getResearchers());
    }
  }

  async addModel(): Promise<void> {
    if (this.modelForm.invalid) {
      alert(this.modelForm.errors);
    } else {
      await this.apiService.addModel(
        this.modelForm.value as Model,
        this.modelForm.value.password as string,
      );
      this.modelForm.reset();
      this.models.set(await this.apiService.getModels());
    }
  }
}
