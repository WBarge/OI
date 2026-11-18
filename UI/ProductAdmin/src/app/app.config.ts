import { ApplicationConfig, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, OI_CONFIG_DEFAULTS, provideOiUiCommon, startOiSession } from '@oi/ui-common';
import { ProductAdminConfig } from '../models/product-admin-config';
import { routes } from './app.routes';
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
              // the sign-in plumbing is shared with the OI UI (UI/oi-ui-common)
              provideOiUiCommon({
                appTitle: 'Product Manager',
                homeRoute: '/products',            // where a signed-in user goes instead of the sign-in page
                forbiddenRoute: '/access-denied',  // signed in, but not an administrator
                // the token is sent to the product API and to nothing else
                securedUrls: (config) => [(config as ProductAdminConfig).productApiUrl],
              }),
              { provide: OI_CONFIG_DEFAULTS, useValue: () => new ProductAdminConfig() },
              // read config.json, then continue without asking again if already signed in (in this UI or in the OI UI)
              provideAppInitializer(() => startOiSession()),
              MessageService]
};
