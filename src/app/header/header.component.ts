import { Component, OnInit, Input } from '@angular/core';

import { navigateInPage } from '../in-page-navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  gotoSection: (targetType: string, target: string) => void;

  constructor() {
    this.gotoSection = navigateInPage;
   }

  ngOnInit() {
    this.getNavTargets();
  }

  @Input() caller:string;
  navTargets:string[] = [];

  getNavTargets() {
    let allPages = ['home', /*'showcase',*/ 'about', 'contact'];
    for (let page of allPages) {
      if (page == this.caller) continue;
      this.navTargets.push(page);
    }
  }

}
