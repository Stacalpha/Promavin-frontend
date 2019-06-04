import { Component, OnInit } from '@angular/core';
//import { Observable } from 'rxjs';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    scrollTo(0, 0);   
  }

  catalogue:Array<any> = this.getCatalogue();

  selectedProduct:any|string = 'custom';

  orderWindowDisplay:boolean = false;

  showOrderWindow(clickedProduct?:any|string):void {
    if (clickedProduct)
      this.selectedProduct = clickedProduct;
    
    this.orderWindowDisplay = true;  
  }

  closeOrderWindow():void {
    this.selectedProduct = 'custom';
    
    this.orderWindowDisplay = false;
  }

  getCatalogue():any[] { //ToDo:- returns :Observable<product>
    return [
      {
        name: 'Agbada',
        price: '15,000',
        deliveryCount: '50+'
      },
      {
        name: 'Kaftan',
        price: '13,500',
        deliveryCount: '30+'
      },
      {
        name: 'Ankara',
        price: '7,000',
        deliveryCount: '60+'
      },
      {
        name: 'Dress Shirts',
        price: '10,000',
        deliveryCount: '50+'
      }
    ];
  }
}
