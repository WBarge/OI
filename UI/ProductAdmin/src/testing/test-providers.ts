import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductAdminConfig } from '../models/product-admin-config';
import { ConfigService } from '../services/config-service';

/**
 * What a page or service needs around it in a spec: http (answered by the test backend), a router, the toast service,
 * and a loaded configuration. Use it as the providers of a "should create" spec.
 */
export const testProviders = [
  provideHttpClient(),
  provideHttpClientTesting(),
  provideRouter([]),
  MessageService,
  { provide: ConfigService, useValue: { config: new ProductAdminConfig() } },
];
