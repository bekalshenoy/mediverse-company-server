import { Component, OnInit, WritableSignal, signal } from '@angular/core';
import { ApiService } from './api.service';
import { Model, Payment } from './types';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-researcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './researcher.component.html',
  styleUrl: './researcher.component.css',
})
export class ResearcherComponent implements OnInit {
  models: WritableSignal<Model[]> = signal([]);
  payments: WritableSignal<Payment[]> = signal([]);
  currentSection: WritableSignal<number> = signal(1);

  constructor(private apiService: ApiService, private router: Router) {
    if (sessionStorage.getItem('role') !== 'ROLE_RESEARCHER') {
      this.router.navigate(['/']);
    }
  }

  async ngOnInit(): Promise<void> {
    this.payments.set(await this.apiService.getPayments());
    this.models.set(await this.apiService.getModels());
  }
}
