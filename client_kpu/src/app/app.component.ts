import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from './_shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { GlobalService } from './_shared/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Client KPU';
  description = 'Very Long Description ...';

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private meta: Meta,
    private as: AuthService,
    private gs: GlobalService
  ) { }

  ngOnInit() {
    if (window.location.protocol === 'https:') {
      this.gs.log(`[IFRAME-PROTOCOL] 'https' Detected, Changing To HTTP Instead.`);
      window.location.protocol = 'http:';
    }
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .pipe(map(() => this.route))
    .pipe(map((route) => {
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route;
    }))
    .pipe(filter((route) => route.outlet === 'primary'))
    .pipe(mergeMap((route) => route.data))
    .subscribe((event) => {
      this.updateSitePage(event.title, event.description, event.keywords);
    });
    const token = localStorage.getItem(environment.tokenName);
    if (token) {
      this.as.verify(token).subscribe(
        success => {},
        error => this.as.logout()
      );
    }
  }

  updateSitePage(newTitle: string, newDescription: string, newKeywords: string) {
    this.title = newTitle;
    this.titleService.setTitle(`Bifeldy | ${newTitle}`);
    this.meta.updateTag({ name: 'og:title', content: newTitle });
    this.description = newDescription;
    this.meta.updateTag({ name: 'description', content: newDescription });
    this.meta.updateTag({ name: 'og:description', content: newDescription });
    this.meta.updateTag({ name: 'keywords', content: newKeywords });
  }
}
