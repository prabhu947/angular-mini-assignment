import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDividerModule,
    MatTabsModule
  ],
  templateUrl: './settings.components.html',
  styleUrls: ['./settings.components.css']
})
export class SettingsComponent implements OnInit {
  profileForm!: FormGroup;
  notificationForm!: FormGroup;
  securityForm!: FormGroup;
  privacyForm!: FormGroup;
  
  themes = [
    { value: 'light', name: 'Light' },
    { value: 'dark', name: 'Dark' },
    { value: 'system', name: 'System Default' }
  ];
  
  languages = [
    { value: 'en', name: 'English' },
    { value: 'fr', name: 'French' },
    { value: 'es', name: 'Spanish' },
    { value: 'de', name: 'German' }
  ];
  
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.initForms();
    this.privacyForm = this.fb.group({
      profileVisibility: ['public'],
      searchEngineIndexing: [true],
      dataSharing: [false]
    });
  }
  
  private initForms(): void {
    this.profileForm = this.fb.group({
      firstName: ['John', [Validators.required]],
      lastName: ['Doe', [Validators.required]],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['555-123-4567', [Validators.pattern(/^\d{3}-\d{3}-\d{4}$/)]],
      language: ['en'],
      theme: ['light']
    });
    
    this.notificationForm = this.fb.group({
      emailNotifications: [true],
      pushNotifications: [true],
      smsNotifications: [false],
      weeklyDigest: [true],
      marketingEmails: [false]
    });
    
    this.securityForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  
  saveProfileSettings(): void {
    if (this.profileForm.valid) {
      this.snackBar.open('Profile settings saved successfully!', 'Close', { duration: 3000 });
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }

savePrivacySettings() {
    console.log('Privacy settings saved');
  }
  saveNotificationSettings(): void {
    if (this.notificationForm.valid) {
      this.snackBar.open('Notification preferences updated!', 'Close', { duration: 3000 });
    }
  }
  
  saveSecuritySettings(): void {
    if (this.securityForm.valid) {
      const newPassword = this.securityForm.get('newPassword')?.value;
      const confirmPassword = this.securityForm.get('confirmPassword')?.value;
      
      if (newPassword !== confirmPassword) {
        this.securityForm.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        return;
      }
      

      this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000 });
      this.securityForm.reset();
    } else {
      this.markFormGroupTouched(this.securityForm);
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
  

  hasError(form: FormGroup, controlName: string, errorName: string): boolean {
    const control = form.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }
}