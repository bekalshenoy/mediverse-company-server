import { Component, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'company-client';
  currentSection: WritableSignal<number> = signal(1);
  loginForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    dob: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  async login(): Promise<void> {
    const { userId, dob, password } = this.loginForm.value;

    if (this.currentSection() == 1) {
      await this.apiService.loginPatient(userId, dob, password);
      this.router.navigate(['/patient']);
    } else if (this.currentSection() == 2) {
      await this.apiService.loginResearcher(userId, password);
      this.router.navigate(['/researcher']);
    } else if (this.currentSection() == 3) {
      await this.apiService.loginAdmin(userId, password);
      this.router.navigate(['/admin']);
    }
  }
}
