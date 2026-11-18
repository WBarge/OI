import { OiBaseConfig } from '@oi/ui-common';

/** What this application reads from config.json (see deploy/config/config.json). */
export class ProductAdminConfig implements OiBaseConfig {
  /** OI.Auth API, ending in /api/ */
  public authApiUrl: string = '';
  /** ProductManager.Service, ending in /api/ */
  public productApiUrl: string = '';
  /** The hub endpoint, ending in /hubs/app */
  public hubUrl: string = '';
}
