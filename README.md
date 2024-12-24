# angular-firebase-auth-
Dashboard Component with Firebase Integration

Overview

The Dashboard component is part of an Angular application integrated with Firebase. It provides functionality to list all registered users in the application. This component is secured using Firebase Authentication and Firestore Security Rules to ensure only authenticated users can access sensitive data.

Features

User Authentication:

Ensures only authenticated users can access the dashboard.

Redirects unauthorized users to the login page.

Firestore Integration:

Retrieves a list of registered users from the users Firestore collection.

Displays user data in a clean and organized table.

Error Handling:

Handles insufficient permissions gracefully.

Displays appropriate messages when no users are found or access is denied.

Security:

Firestore security rules restrict access to authenticated users only.

Data integrity is maintained through restricted read/write permissions.

Functionalities

Fetch Users:

The fetchUsers method retrieves all documents from the users collection in Firestore.

Automatically updates the user list in real-time when changes occur in Firestore.

Authentication Check:

Uses Firebase Authentication to ensure only logged-in users can view the dashboard.

Responsive Table:

User data is displayed in a responsive HTML table for easy viewing.

Implementation Details

Component Code

Dashboard Component (TypeScript):

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: any[] = []; // Store the list of registered users

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.auth.user.subscribe((user) => {
      if (user) {
        // User is authenticated
        this.fetchUsers();
      } else {
        // Redirect to login or show an error
        console.error('User not authenticated');
      }
    });
  }

  fetchUsers(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe(
        (data: any[]) => (this.users = data),
        (error) => console.error('Error fetching users:', error)
      );
  }
}

Dashboard Component (HTML):

<div *ngIf="users.length === 0; else userList">
  <p>No users found or insufficient permissions.</p>
</div>

<ng-template #userList>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Invite Code</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let user of users">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.inviteCode }}</td>
      </tr>
    </tbody>
  </table>
</ng-template>

Styling (CSS)

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

Firestore Security Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to authenticated users
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
  }
}

How to Run

Ensure the Firestore rules are updated in the Firebase console.

Run the Angular application using:

ng serve

Sign in with an authenticated user account.

Navigate to the dashboard to view the list of registered users.

Error Handling

If you encounter a Missing or insufficient permissions error:

Verify Firestore security rules.

Ensure the signed-in user has the necessary permissions.

Future Improvements

Add pagination and search functionality to the user list.

Implement role-based access control for enhanced security.

Display user registration timestamps and other relevant metadata.
