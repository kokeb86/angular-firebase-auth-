import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';  // Use for compat SDK
import 'firebase/compat/auth';  // Ensure auth is included

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // Signup method
  async onSignup() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      const user: firebase.User | null = userCredential.user;

      if (user) {
        if (!user.emailVerified) {
          await user.sendEmailVerification();  // Send email verification
          this.toastr.success('Signup successful! Please verify your email.');

          // After email verification, register user in Firestore
          user.sendEmailVerification().then(() => {
            this.afAuth.currentUser.then(async (user) => {
              if (user && user.emailVerified) {
                await this.registerUserInFirestore(user);
                this.toastr.success('User registered successfully in Firestore');
                this.router.navigate(['/admin/login']);  // Redirect to login page
              }
            }).catch((error: any) => {
              this.toastr.error(error.message, 'Error');
            });
          });
        }
      }
    } catch (error: any) {
      this.toastr.error(error.message, 'Error');
    }
  }

  // Method to register the user in Firestore
  async registerUserInFirestore(user: firebase.User) {
    const userRef = this.firestore.collection('users').doc(user.uid);
    await userRef.set({
      email: user.email,
      uid: user.uid,
      displayName: user.displayName || '',
      createdAt: new Date(),
    });
  }
}
