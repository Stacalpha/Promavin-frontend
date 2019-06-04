import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  @Input() caller:string;
  @Input() product:any|string;

  @Output() orderClick = new EventEmitter<any>();

  orderProduct():void {
    this.orderClick.emit(this.product);
  }

  /*openProductModal():void {
    //"ToDo v2: Expand card to a modal window with carousel of style pictures.");
  }*/
}
