import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

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
    private meta: Meta
  ) { }

  ngOnInit() {
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
