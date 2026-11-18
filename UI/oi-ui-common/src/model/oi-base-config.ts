/**
 * The settings every UI that uses this library has in its config.json. Each application extends it with
 * its own settings (see the Configuration class in the OI UI and ProductAdminConfig in the ProductManager UI).
 */
export interface OiBaseConfig {
  /** OI.Auth API, ending in /api/ */
  authApiUrl: string;
  /** The SignalR hub endpoint, ending in /hubs/app */
  hubUrl: string;
}
