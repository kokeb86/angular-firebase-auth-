import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users: any[] = []; // Store the list of registered users

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((data: any[]) => {
        this.users = data;
      });
  }
}
