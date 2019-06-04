export class Product {
  constructor(
        public id:string
      ) {
    if (id === 'custom')
      this.type = 'custom';
  }

  type = 'standard';
  desc:string = "";
  samples:Array<any> = [];
}
