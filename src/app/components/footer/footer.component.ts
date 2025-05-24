import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  showFooter = false;

  // Detectar si el cursor está dentro del umbral inferior de la ventana
  @HostListener('window:mousemove', ['$event.clientY'])
  onMouseMove(y: number) {
    const threshold = 100; // píxeles desde la parte inferior
    const windowHeight = window.innerHeight;

    this.showFooter = y > windowHeight - threshold;
  }
}