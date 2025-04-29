import { computed, Injectable, signal } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile, User, UserCredential } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);

  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => !!this._user());

  constructor(private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this._user.set(user);
    });
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password)
      .then(respond => updateProfile(respond.user, { displayName: username }));

    return from(promise);
  }

  logout() : Observable<void> {
    return from(signOut(this.auth));
  }

  loginWithGoogle(): Observable<UserCredential> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider));
  }
}
