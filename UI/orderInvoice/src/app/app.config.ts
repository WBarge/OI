import { ApplicationConfig,provideAppInitializer,inject  } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor, HUB_NOTIFICATION_HANDLER, OI_CONFIG_DEFAULTS, provideOiUiCommon, startOiSession } from '@oi/ui-common';
import { Configuration } from '../model/configuration';
import { CompanyProfileSyncService } from '../services/company-profile-sync-service';
import { ReportStatusService } from '../services/report-status-service';

import { providePrimeNG } from 'primeng/config';
import {definePreset} from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import { MessageService } from 'primeng/api';

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}'
    }
  }
});

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes, withComponentInputBinding()),
              providePrimeNG({
                  theme: {
                    preset: MyPreset,
                    // Default options,
                    options: {
                        prefix: 'p',
                        darkModeSelector: 'system',
                        cssLayer: false,
                        cssVariables: true
                    }
                  },
                license: 'eyJpZCI6IjgxYmZmNTc5LTBjOGItNDFmYS1iZWZlLTkzMTMxZDc1ZTExYiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODcyNzMyNjQsImV4cCI6MTgxODgwOTI2NH0.uKb3JsOGna6TXt89RUwLsDpXohO5YuDjOkFE9WOhzpCL4CT6S3LIhcNaxT3qYs_6isvQ-AkjByTYfI5WkOQkCg'
              }),
              provideHttpClient(withInterceptors([authInterceptor])),
              // the sign-in plumbing is shared with the ProductManager UI (UI/oi-ui-common)
              provideOiUiCommon({
                appTitle: 'Order Invoice',
                // the id this application is registered under in OI.Auth's "Clients" settings; its redirect addresses
                // there must be this application's /auth/callback and /signed-out
                clientId: 'oi-ui',
                // the token is sent to these APIs and to nothing else. OI.Auth's sign-in endpoints (/connect/...) and
                // service-token must never get one; only its administration endpoints do.
                securedUrls: (config) => {
                  const settings = config as Configuration;
                  return [
                    settings.oiApiUrl,
                    settings.reportingApiUrl,
                    settings.productApiUrl,   // reading products needs a valid token
                    settings.authApiUrl.length > 0 ? settings.authApiUrl + 'admin/' : '',
                  ];
                },
              }),
              { provide: OI_CONFIG_DEFAULTS, useValue: () => new Configuration() },
              // lets pages know a report is ready or failed, whenever the hub delivers it
              { provide: HUB_NOTIFICATION_HANDLER, useExisting: ReportStatusService, multi: true },
              // one initializer, not two: restoring the session needs the auth api address from config.json,
              // and separate initializers do not wait for each other
              provideAppInitializer(async () => {
                const companyProfileSync = inject(CompanyProfileSyncService);
                await startOiSession();   // read config.json, then continue without asking again if already signed in from an earlier visit
                // send the company details to the Reporting API once: now if signed in, otherwise at the first sign-in.
                // start() only begins watching; the upload runs in the background, so the app never waits for it.
                companyProfileSync.start();
              }),
              MessageService]
};
