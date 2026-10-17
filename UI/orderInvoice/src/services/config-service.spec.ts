import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ConfigService } from './config-service';
import { Configuration } from '../model/configuration';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpTestingController: HttpTestingController;

  // the service appends a cache busting "?v=<timestamp>" so the url is never a fixed string
  const isConfigRequest = (req: { url: string }) => /^\/config\.json\?v=\d+$/.test(req.url);

  const serverConfig = {
    HideShippingAddress: true,
    EnableCustomProducts: true,
    productApiUrl: 'https://products.test/api/',
    oiApiUrl: 'https://oi.test/api/'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('before the configuration is loaded', () => {
    it('should throw when the configuration is read', () => {
      expect(() => service.config).toThrow('Configuration accessed before it was loaded.');
    });

    it('should not call the server until load is called', () => {
      httpTestingController.expectNone(isConfigRequest);
    });
  });

  describe('load', () => {
    it('should GET /config.json with a cache busting version parameter', async () => {
      const loading = service.load();

      const request = httpTestingController.expectOne(isConfigRequest);
      expect(request.request.method).toBe('GET');
      request.flush(serverConfig);
      await loading;
    });

    it('should keep the response as a Configuration instance with all four settings', async () => {
      const loading = service.load();
      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await loading;

      const config = service.config;
      expect(config).toBeInstanceOf(Configuration);
      expect(config.HideShippingAddress).toBe(true);
      expect(config.EnableCustomProducts).toBe(true);
      expect(config.productApiUrl).toBe('https://products.test/api/');
      expect(config.oiApiUrl).toBe('https://oi.test/api/');
    });

    it('should fall back to the defaults for settings missing from the file', async () => {
      const loading = service.load();
      httpTestingController.expectOne(isConfigRequest).flush({ HideShippingAddress: true });
      await loading;

      expect(service.config.HideShippingAddress).toBe(true);
      expect(service.config.EnableCustomProducts).toBe(false);
      expect(service.config.productApiUrl).toBe('');
      expect(service.config.oiApiUrl).toBe('');
    });

    it('should hand back the same configuration object on every read', async () => {
      const loading = service.load();
      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await loading;

      expect(service.config).toBe(service.config);
    });

    it('should not touch the network again when the configuration is read', async () => {
      const loading = service.load();
      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await loading;

      service.config;
      service.config;

      httpTestingController.expectNone(isConfigRequest);
    });

    it('should replace the configuration when it is loaded again', async () => {
      let loading = service.load();
      httpTestingController.expectOne(isConfigRequest).flush(serverConfig);
      await loading;

      loading = service.load();
      httpTestingController.expectOne(isConfigRequest).flush({ ...serverConfig, HideShippingAddress: false });
      await loading;

      expect(service.config.HideShippingAddress).toBe(false);
    });

    it('should reject, and leave the configuration unavailable, when the file cannot be loaded', async () => {
      const loading = service.load();
      httpTestingController.expectOne(isConfigRequest)
        .flush('missing', { status: 404, statusText: 'Not Found' });

      await expect(loading).rejects.toBeDefined();
      expect(() => service.config).toThrow('Configuration accessed before it was loaded.');
    });
  });
});
