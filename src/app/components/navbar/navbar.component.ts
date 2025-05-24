import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf,AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user$: Observable<User | null> = this.authService.user$;

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Sesión cerrada');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error('Error al cerrar sesión', error);
      }
    });
  }
   goHome(): void {
    this.router.navigateByUrl('/home');
  }
}
