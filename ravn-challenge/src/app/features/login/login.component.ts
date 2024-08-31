import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MainButtonComponent } from '../../shared/components/main-button/main-button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppState } from '../../core/store/idk/app.store';
import { Router } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    ClipboardModule,
    MatIconModule,

    MainButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  });

  private _snackBar = inject(MatSnackBar);


  userStore = inject(AppState);

  handleOpenToast() {
    this._snackBar.open("text copied to clipboard", 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 2000,
    });
  }

  constructor(
    private router: Router,
  ) { }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      // client side validation

      if (formData.email === this.userStore.profile.email() && formData.fullName === this.userStore.profile.fullName()) {
        this.userStore.login();
        this.router.navigate(['/user/dashboard']);
      } else {
        this._snackBar.open('Wrong name or email', 'OK', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        });
      }
    } else {
      this._snackBar.open('Wrong name or email', 'OK', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    }
  }

  ngOnInit(): void {
    this.userStore.loadProfile();
  }

}
