import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  isEmailVerified: boolean = false;  // Add the isEmailVerified property

  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.checkEmailVerification();
  }

  // Method to check email verification status
  checkEmailVerification() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        this.isEmailVerified = user.emailVerified;  // Update the isEmailVerified property
      }
    }).catch(error => {
      this.toastr.error('Error checking email verification.', 'Error');
    });
  }

  // Method to resend verification email
  resendVerificationEmail() {
    this.afAuth.currentUser.then(user => {
      if (user && !user.emailVerified) {
        user.sendEmailVerification().then(() => {
          this.toastr.success('Verification email sent!', 'Success');
        }).catch(error => {
          this.toastr.error('Error sending verification email.', 'Error');
        });
      }
    });
  }
}
