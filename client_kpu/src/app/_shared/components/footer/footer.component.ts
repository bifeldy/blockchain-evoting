import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  githubLastCommit = null;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit() {
    this.api.getData('https://api.github.com/repos/Bifeldy/blockchain-evoting/commits').subscribe(
      res => {
        this.githubLastCommit = res[0];
      }
    );
  }

}
