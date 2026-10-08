import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { vi } from 'vitest';
import { ConfigService } from './config-service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), MessageService]
    });
    service = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should cache the configuration for repeated subscriptions', () => {
    const firstResult = vi.fn();
    const secondResult = vi.fn();

    service.getConfiguration().subscribe(firstResult);

    const request = httpTestingController.expectOne((req) => req.url.startsWith('/config.json?'));
    request.flush({ HideShippingAddress: true, EnableCustomProducts: true });

    service.getConfiguration().subscribe(secondResult);

    expect(firstResult).toHaveBeenCalledWith(expect.objectContaining({
      HideShippingAddress: true,
      EnableCustomProducts: true
    }));
    expect(secondResult).toHaveBeenCalledWith(expect.objectContaining({
      HideShippingAddress: true,
      EnableCustomProducts: true
    }));
    httpTestingController.expectNone((req) => req.url.startsWith('/config.json?'));
    httpTestingController.verify();
  });
});
