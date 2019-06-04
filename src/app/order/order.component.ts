import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    this.windowTitle= this.productId === 'custom' ? 'Custom Order' : 'Order';
   }
  
  @Input() productId:string = 'custom';
  
  @Output() orderClosed = new EventEmitter<void>();

  orderDetails:any;
  windowTitle:string;

  useMailBtnText = 'Use eMail';
  contactLabel:string = 'Phone';
    
  contactError:string;
  locationError:string;
  nameError:string;
  
  formData = {
    name: '',
    location: '',
    contactPref: 'Phone',
    email: '',
    phone: ''
  }
  
  nameValidity:boolean = false;
  phoneValidity:boolean = false;
  eMailValidity:boolean = false;
  locationValidity:boolean = false;
  myFormValidity:boolean = false;
 
  touchedCtrls:Array<string> = [];

  onTouched(ctrlName:string):void {
    if (this.touchedCtrls.includes(ctrlName)) return;

    this.touchedCtrls.push(ctrlName);
  }

  //Validators
  checkFormValidity():void {
    let contactValidity = this.formData.contactPref ==='Phone' ? this.phoneValidity : this.eMailValidity; 
    if (this.nameValidity && this.locationValidity && contactValidity)
      this.myFormValidity = true;
    else this.myFormValidity = false;
  }

  nameValidator() {
    let showErrMsg:boolean = false;
    if (this.touchedCtrls.includes('name')) 
      showErrMsg = true;

    let pattern = /^[A-Za-z-']{2,}\s[A-Za-z-']{2,}(\s[A-Za-z-']{2,})?\s?$/;
    
    if (!pattern.test(this.formData.name)) {
      this.nameValidity = false;
      if (showErrMsg) { //Not using tenary to avoid performing the regex test if we're not going to show ErrMsg.
          if (/(^|\s)\w(\.\s|\.$|\s|$)/.test(this.formData.name))
              this.nameError = "It seems you used initials. Please enter your full name instead.";
          else if (/^[A-Za-z-']*\s?$/.test(this.formData.name)) 
              this.nameError = 'Please enter your full name.';
          else this.nameError = "Input may contain unexpected characters. Please check for typos.";
      }
    }
    else if (this.formData.name.length > 100) {
      this.nameValidity = false;
      this.nameError = showErrMsg ? 'The input is longer than expected. Please check.' : '';
    } 
    else {
      this.nameValidity = true;
      this.nameError = '';
    }

    this.checkFormValidity();
  }

  phoneValidator():void {
    let showErrMsg:boolean = false;
    if (this.touchedCtrls.includes('phone')) 
      showErrMsg = true;

    let pattern = /^0[789][01]\d\s[\d]{3}\s[\d]{4}$/;
    this.formData.phone = this.formatTel(this.formData.phone);

    if (this.formData.phone === '') {
      this.phoneValidity = false;
      this.contactError = showErrMsg ? 'We need your contact information to communicate with you. Please enter your phone number.' : '';
    }

    else if (this.formData.phone.length !== 13){
      this.phoneValidity = false;
      this.contactError = showErrMsg ? 'Phone number should be 11 digits long.' : '';
    }

    else if (!pattern.test(this.formData.phone)) {
      this.phoneValidity = false;
      this.contactError = showErrMsg ? 'Enter a number in the format "0801 234 5678". Do not add spaces.' : '';
    }

    else {
      this.phoneValidity = true;
      this.contactError = '';
    }

    this.checkFormValidity();
  }

  eMailValidator() {
    let showErrMsg:boolean = false;
    if (this.touchedCtrls.includes('email')) 
      showErrMsg = true;

    let pattern = /^[A-Za-z0-9._-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,63}$/;

    if (this.formData.email === '') {
      this.eMailValidity = false;
      this.contactError = showErrMsg ? 'We need your contact information to communicate with you. Please enter your eMail address.' : '';
    }

    else if (this.formData.email.length > 255) {
      this.eMailValidity = false;
      this.contactError = showErrMsg ? 'Input exceeds the maximum length for eMail adresses' : '';
    }

    else if (!pattern.test(this.formData.email)) {
      this.eMailValidity = false;
      this.contactError = showErrMsg ? 'Input may contain unexpected characters. eMail should resemble "yourname@example.com.' : '';
    }
    
    else {
      this.eMailValidity = true;
      this.contactError = '';
    }

    this.checkFormValidity();
  }

  locationValidator() {
    let showErrMsg:boolean = false;
    if (this.touchedCtrls.includes('name')) 
      showErrMsg = true;

    if (this.formData.location) {
      this.locationValidity = true;
      this.locationError = '';
    }

    else {
      this.locationValidity = false;
      this.locationError = showErrMsg ? 'This field is required. Please select your location.' : '';
    }

    this.checkFormValidity();
  }
  //ToDo(v2): Add button to ignore validation warnings.
  //End Validators.
  
  toggleContactPref() {
    this.formData.contactPref = this.formData.contactPref === 'Phone' ? 'eMail' : 'Phone';
    
    this.contactLabel = this.formData.contactPref === 'Phone' ? 'Phone' : 'eMail';
    this.useMailBtnText = this.formData.contactPref === 'Phone' ? 'Use eMail' : 'Use Phone';
    this.formData.contactPref === 'Phone' ? this.phoneValidator() : this.eMailValidator();
  }
  
  formatTel(rawNumber:string):string {
    if (/^[\d]{5,7}$/.test(rawNumber))
    return (`${rawNumber.substring(0,4)} ${rawNumber.substring(4)}`);
    
    else if (/^[\d]{8,11}$/.test(rawNumber))
    return (`${rawNumber.substring(0,4)} ${rawNumber.substring(4,7)} ${rawNumber.substring(7)}`);
    
    else if (/^[\d]{4}\s[\d]{4,7}$/.test(rawNumber))
    return (`${rawNumber.substring(0,8)} ${rawNumber.substring(8)}`);
    
    else return rawNumber;
  }
  
  onSubmit():void {
    //First remove all spaces from the phone number input.
    this.formData.phone = this.formData.phone.replace(/ /g, '');
    
    this.orderDetails = { //new CoutureOrder(this.productId, this.formData);
      productId: this.productId,
      customer: this.formData
    }
    
    console.log(`Form submitted with the following values:\n 
    ${JSON.stringify(this.orderDetails)}`
    );
                
    this.closeOrder();
    //ToDo:- Send the new Order to server now.
  }
  
  onSubmitAttempt() {
    this.touchedCtrls = ["name", "phone", "email", "location"];
    this.nameValidator();
    this.formData.contactPref === 'Phone' ? this.phoneValidator() : this.eMailValidator();
    this.locationValidator();
  }
  
  closeOrder():void {
    this.orderClosed.emit();
  }
}
