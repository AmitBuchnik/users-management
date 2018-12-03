import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyChgQZbDX4027jk3RRvo5fDos-3E-Zwg0o",
      authDomain: "users-management-2e2ec.firebaseapp.com",
    });
  }
}


