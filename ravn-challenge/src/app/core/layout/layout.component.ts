import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from '../../features/dashboard/components/sidebar/sidebar.component';
import { AppState } from '../store/idk/app.store';
import { TaskListStore } from '../store/idk/task.store';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidenavService } from '../services/sidenav.service';
import { TopSearchBarComponent } from '../../features/dashboard/components/top-search-bar/top-search-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatSidenavModule,

    TopSearchBarComponent,
    SidebarComponent,

  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidebar') public sidebar!: MatSidenav;
  appStore = inject(AppState);
  taskStore = inject(TaskListStore);

  constructor(
    private responsive: BreakpointObserver,
    private sideNavService: SidenavService,

  ) { }

  ngOnInit(): void {
    this.taskStore.loadAllTasks();
    this.appStore.loadProfile();


    this.sideNavService.sideNavToggleSubject.subscribe(() => {
      this.sidebar?.toggle();
    });

    this.responsive.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ])
      .subscribe(result => {
        const breakpoints = result.breakpoints;

        if (breakpoints[Breakpoints.Small] || breakpoints[Breakpoints.XSmall]) {
          this.appStore.setScreenSize(true);
        } else if (breakpoints[Breakpoints.Medium] || breakpoints[Breakpoints.Large]) {
          this.appStore.setScreenSize(false);
        }

      });
  }

}
