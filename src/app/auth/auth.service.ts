import { Injectable } from '@angular/core';
import { Auth, browserSessionPersistence, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, user, User } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, setPersistence } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(private firebaseAuth: Auth) {
    this.setSessionStoragePersistence();
    this.user$ = user(this.firebaseAuth);
  }

  private setSessionStoragePersistence(): void {
    setPersistence(this.firebaseAuth, browserSessionPersistence);
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email.trim(), password));
  }

  logout(): Observable<void> {
    return from(signOut(this.firebaseAuth).then(() => sessionStorage.clear()));
  }

  register(email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {});
    return from(promise);
  }
}
