import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import {provideHttpClient} from '@angular/common/http';
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
              provideHttpClient(),
              MessageService]
};
