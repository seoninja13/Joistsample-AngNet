import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/layout/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  template: `
    <app-nav-bar></app-nav-bar>
    <main class="container mx-auto px-4 py-8">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'ContractorPro';
}