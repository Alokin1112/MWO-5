import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthRequest } from '@core/interfaces/auth.interface';
import { AuthService } from '@core/services/auth.service';
import { catchError, of, take, tap } from 'rxjs';

@Component({
  selector: 'ds-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  canSubmit = true;
  private fb = inject(FormBuilder);

  form = this.fb.group({
    username: [null as string, [Validators.required]],
    password: [null as string, [Validators.required]],
  });


  private router = inject(Router);
  private authService = inject(AuthService);

  submit(): void {
    if (this.form.invalid) return;
    this.canSubmit = false;
    const user = this.form.value as unknown as AuthRequest;

    this.authService.register(user).pipe(
      take(1),
      tap((res) => {
        this.authService.token = res?.token;
        void this.router.navigateByUrl('/home');
      }),
      catchError(() => {
        this.form.reset();
        this.canSubmit = true;
        return of(false);
      })
    ).subscribe();
  }

}
