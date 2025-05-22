import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  async logout(): Promise<void> {
    try {
      await this.authService.logout().toPromise();
      console.log('Sesión cerrada');
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }
}
