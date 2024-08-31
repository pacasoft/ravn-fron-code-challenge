import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs';
import { AppState } from './core/store/idk/app.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  appState = inject(AppState);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }


  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route: any) => {

        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route: any) => route.outlet === 'primary'),
      mergeMap(route => {
        return route.data;
      })
    ).subscribe((event: any) => {
      if (event['title']) {
        this.titleService.setTitle(event['title'])
        this.appState.setRoute(event['title']);
      }
    });
  }
}

