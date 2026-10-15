import { CustomerSearch } from "./customer-search";

export class Customer extends CustomerSearch {

  constructor(){
    super();
  }

  public defaultBillingAddress1:string = "";
  public defaultBillingAddress2:string = "";
  public defaultBillingCity:string = "";
  public defaultBillingStateCode:string = "";
  public defaultBillingZipCode:string = "";
  public defaultShippingAddress1:string = "";
  public defaultShippingAddress2:string = "";
  public defaultShippingCity:string = "";
  public defaultShippingStateCode:string = "";
  public defaultShippingZipCode:string = "";
}
