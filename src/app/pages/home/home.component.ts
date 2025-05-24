import { Component, OnInit, inject } from '@angular/core';
import { ShowMoviesComponent } from '../../components/show-movies/show-movies.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShowMoviesComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  user$ = this.authService.user$;

  ngOnInit(): void {}

  async signOut() {
    try {
      await this.authService.logout().toPromise();
      this.router.navigateByUrl('/');
    } catch (error) {
      console.error("sign out error", error);
    }
  }
}
