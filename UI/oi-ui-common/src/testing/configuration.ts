import { OiBaseConfig } from '../model/oi-base-config';

/** A stand-in for an application's own configuration class, for the specs only. */
export class Configuration implements OiBaseConfig {
  public disableAddresses: boolean = false;
  public HideShippingAddress: boolean = false;
  public EnableCustomProducts: boolean = false;
  public authApiUrl: string = '';
  public hubUrl: string = '';
  public oiApiUrl: string = '';
  public reportingApiUrl: string = '';
  public productApiUrl: string = '';
}
