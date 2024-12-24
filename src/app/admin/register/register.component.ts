import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

interface InviteData {
  expiresAt?: { seconds: number }; // Firebase timestamps
  used?: boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  inviteCode: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  async onRegister() {
    try {
      // Fetch invite code document
      const inviteDoc = await this.firestore
        .collection('inviteCodes')
        .doc(this.inviteCode)
        .get()
        .toPromise();

      if (!inviteDoc?.exists) {
        this.toastr.error('Invalid invite code');
        return;
      }

      // Typecast the document data
      const inviteData = inviteDoc.data() as InviteData | undefined;

      if (!inviteData) {
        this.toastr.error('Invite data is unavailable');
        return;
      }

      const expiresAt = inviteData.expiresAt?.seconds
        ? inviteData.expiresAt.seconds * 1000
        : null;

      if (expiresAt && Date.now() > expiresAt) {
        this.toastr.error('Invite code has expired');
        return;
      }

      if (inviteData.used) {
        this.toastr.error('Invite code has already been used');
        return;
      }

      // Create user in Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      // Update user profile with username
      await userCredential.user?.updateProfile({ displayName: this.username });

      // Mark invite code as used
      await this.firestore
        .collection('inviteCodes')
        .doc(this.inviteCode)
        .update({ used: true });

      // Add user data to Firestore (optional)
      await this.firestore.collection('users').add({
        email: this.email,
        username: this.username,
        createdAt: new Date(),
      });

      // Registration success
      this.toastr.success('Registration successful!');
      this.router.navigate(['/admin/login']);
    } catch (error: any) {
      const errorMessage = error?.message || 'An unexpected error occurred';
      this.toastr.error(errorMessage, 'Error');
    }
  }
}
