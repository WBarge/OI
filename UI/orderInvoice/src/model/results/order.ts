import { OrderItem } from "./order-item";

export class Order {
  public idValue:string="";
  public orderNumber:string="";
  public orderDate:Date = new Date();
  public completedDate:Date = new Date();
  public customerId:string = "";
  public customerName:string = "";
  public phoneNumber:string="";
  public billingAddress1: string = "";
  public billingAddress2: string = "";
  public billingCity: string = "";
  public billingStateCode: string = "";
  public billingZipCode: string = "";
  public shippingAddress1: string = "";
  public shippingAddress2: string = "";
  public shippingCity: string = "";
  public shippingStateCode: string = "";
  public shippingZipCode: string = "";
  public orderItems:OrderItem[] = [];
  public subTotal:number=0;
  public shipping:number=0;
  public tax:number=0;
  public total:number=0;
  public isPending:boolean=true;

}
