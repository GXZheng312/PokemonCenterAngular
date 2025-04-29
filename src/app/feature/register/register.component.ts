import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'feature-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);

  registerForm = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });

  password = toSignal(this.registerForm.get('password')!.valueChanges, {
    initialValue: this.registerForm.get('password')!.value,
  });
  
  confirmPassword = toSignal(this.registerForm.get('confirmPassword')!.valueChanges, {
    initialValue: this.registerForm.get('confirmPassword')!.value,
  });
  
  passwordMatch = computed(() => this.password() === this.confirmPassword());

  onSubmit() {
    const rawForm = this.registerForm.getRawValue();

    this.authService
      .register(rawForm.email, rawForm.username, rawForm.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error registering user:', error);
        }
      })
  }
}


