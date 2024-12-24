import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Add this
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // Import any other Firebase services you're using
import { LoginComponent } from './admin/login/login.component';
import { BrowserModule } from '@angular/platform-browser';  // <-- Make sure this is imported
import { SignupComponent } from './admin/signup/signup.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { environment } from '../environment/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './admin/dashboard/dashboard.component';  // Import animations module


const routes: Routes = [
  {path: '', redirectTo: 'admin/login', pathMatch: 'full' },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/signup', component: SignupComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'admin/forgot-password', component: ForgotPasswordComponent },
  { path: 'admin/verify-email', component: VerifyEmailComponent },

];

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,  // Ensure this is present for browser support
    CommonModule,
    FormsModule,
    AngularFirestoreModule,
    ReactiveFormsModule, // Ensure this is imported
    RouterModule.forRoot(routes),  // Change to forRoot() for root routes
    AngularFireModule.initializeApp(environment.firebase),  // Initialize Firebase
    AngularFireAuthModule,  // Add Firebase auth module if needed
    BrowserAnimationsModule,  // This is required for animations
        ToastrModule.forRoot({  // Configure the ToastrModule
          timeOut: 3000,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
        }),
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent]  // Bootstrap the AppComponent
})
export class AppModule { }
