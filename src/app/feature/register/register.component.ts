import { Component, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'feature-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  registerForm = this.fb.group({
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
    console.log(this.registerForm.getRawValue());
  }
}


