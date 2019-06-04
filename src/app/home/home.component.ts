import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    scrollTo(0, 0);
  }

  selectedProduct:any|string = 'custom';
  orderWindowDisplay:boolean = false;
  featuredProducts:Array<any> = this.getFeaturedProducts();

  showOrderWindow(clickedProduct?:any|string):void {
    if (clickedProduct)
      this.selectedProduct = clickedProduct;
    
    this.orderWindowDisplay = true;  
  }

  closeOrderWindow():void {
    this.selectedProduct = 'custom';
    
    this.orderWindowDisplay = false;
  }

  getFeaturedProducts():any[] { //ToDo:- returns :Observable<product>
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
