import { ConfigService as SharedConfigService } from '@oi/ui-common';
import { Configuration } from '../model/configuration';

// The loading of config.json lives in the shared library (UI/oi-ui-common). This is the very same service (the same
// injection token), seen through this application's own Configuration type so every call site keeps its types.
// The defaults for settings missing from config.json are registered in app.config.ts (OI_CONFIG_DEFAULTS).
export type ConfigService = SharedConfigService<Configuration>;
export const ConfigService = SharedConfigService as unknown as new () => SharedConfigService<Configuration>;
