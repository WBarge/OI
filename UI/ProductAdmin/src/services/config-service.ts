import { ConfigService as SharedConfigService } from '@oi/ui-common';
import { ProductAdminConfig } from '../models/product-admin-config';

// Loading config.json lives in the shared library (UI/oi-ui-common). This is the very same service (the same
// injection token), seen through this application's own ProductAdminConfig type so every call site keeps its types.
// The defaults for settings missing from config.json are registered in app.config.ts (OI_CONFIG_DEFAULTS).
export type ConfigService = SharedConfigService<ProductAdminConfig>;
export const ConfigService = SharedConfigService as unknown as new () => SharedConfigService<ProductAdminConfig>;
