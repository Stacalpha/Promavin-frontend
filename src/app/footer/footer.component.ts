import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor() { }

  @Input() caller:string;

  tagLine1:string;
  tagLine2:string;

  actionLabel:string;
  action:any;

  @Output() orderClick = new EventEmitter<void>();

  orderNow():void {
    this.orderClick.emit();
  }

  highlightContactLinks():void {
    document.getElementById('footer-left').focus();
  }

  setContentValues():void {
    switch (this.caller) {
      case 'home': {
        this.tagLine1 = 'Look No Further For A Perfect Fit';
        this.tagLine2 = "You're one click from a wonderful tailoring experience";

        this.actionLabel = 'Order Now';
        this.action = this.orderNow;

        break;
      }
      case 'about': {
        this.tagLine1 = 'Get In Touch With The Team';
        this.tagLine2 = "We'd love to hear from you";

        this.actionLabel = 'Contact Us';
        this.action = this.highlightContactLinks;

        break;
      }
      case 'showcase': {
        this.tagLine1 = "Didn't See What You Like? "
        this.tagLine2 = "Tell us what you want, we'll make it happen";

        this.actionLabel = 'Custom Order';
        this.action = this.orderNow;

        break;
      }
    }
  }

  ngOnInit() {
    this.setContentValues();
  }

}
