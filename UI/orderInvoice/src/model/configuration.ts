export class Configuration {
  public disableAddresses:boolean = false;
  public HideShippingAddress: boolean = false;
  public EnableCustomProducts: boolean = false;
  public productApiUrl: string = "";
  public oiApiUrl:string = "";
  public authApiUrl: string = "";
  public reportingApiUrl: string = "";
  public hubUrl: string = "";
  public companyName: string = "";
  public companyLogoUrl: string = "";
  public companyAddress: string = "";
  public companyCity: string = "";
  public companyState: string = "";
  public companyZip: string = "";
  public companyEmail: string = "";
  public companyPhone: string = "";
  public companyContactName: string = "";
  public companyContactEmail: string = "";
  public companyContactPhone: string = "";
  public defaultShippingAmount: number = 0.00;
  public forceEstimateCreation: boolean = false;
}
