import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CompanyProfileSyncService } from './company-profile-sync-service';
import { ConfigService } from './config-service';
import { AuthService } from './auth-service';

describe('CompanyProfileSyncService', () => {
  let service: CompanyProfileSyncService;
  let configService: ConfigService;
  let httpTestingController: HttpTestingController;
  let signedIn = signal(false);

  const isConfigRequest = (req: { url: string }) => req.url.startsWith('/config.json?');
  const uploadUrl = 'https://reporting.test/api/CompanyProfile';
  const logoUrl = 'https://cdn.test/images/brand/logo.png';
  const logoBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 1, 2, 3]);

  const company = {
    reportingApiUrl: 'https://reporting.test/api/',
    companyName: 'Acme Tools',
    companyLogoUrl: logoUrl,
    companyAddress: '1 Main Street',
    companyCity: 'Phoenix',
    companyState: 'AZ',
    companyZip: '85001',
    companyEmail: 'orders@acme.test',
    companyPhone: '602-555-0100',
  };

  const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

  const loadConfig = async (values: object) => {
    const loading = configService.load();
    httpTestingController.expectOne(isConfigRequest).flush(values);
    await loading;
  };

  /** Lets the effect run and the async upload move on. */
  const flushWork = async () => {
    TestBed.tick();
    await settle();
  };

  const answerLogo = async (url = logoUrl) => {
    const request = httpTestingController.expectOne(url);
    expect(request.request.responseType).toBe('blob');
    request.flush(new Blob([logoBytes], { type: 'image/png' }));
    await settle();
  };

  beforeEach(() => {
    signedIn = signal(false);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: { isAuthenticated: signedIn.asReadonly(), currentToken: null } },
      ],
    });
    service = TestBed.inject(CompanyProfileSyncService);
    configService = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    httpTestingController.verify();
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when the user is signed in', () => {
    beforeEach(async () => {
      await loadConfig(company);
      signedIn.set(true);
    });

    it('should read the logo first, then upload everything with a PUT to the CompanyProfile endpoint', async () => {
      service.start();
      TestBed.tick();

      await answerLogo();
      const upload = httpTestingController.expectOne(uploadUrl);
      expect(upload.request.method).toBe('PUT');
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should send the text details as form fields', async () => {
      service.start();
      TestBed.tick();
      await answerLogo();

      const upload = httpTestingController.expectOne(uploadUrl);
      const body = upload.request.body as FormData;
      expect(body).toBeInstanceOf(FormData);
      expect(body.get('companyName')).toBe('Acme Tools');
      expect(body.get('companyAddress')).toBe('1 Main Street');
      expect(body.get('companyCity')).toBe('Phoenix');
      expect(body.get('companyState')).toBe('AZ');
      expect(body.get('companyZip')).toBe('85001');
      expect(body.get('companyEmail')).toBe('orders@acme.test');
      expect(body.get('companyPhone')).toBe('602-555-0100');
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should send the logo as a file named with everything after the last slash, and repeat that name as a field', async () => {
      service.start();
      TestBed.tick();
      await answerLogo();

      const upload = httpTestingController.expectOne(uploadUrl);
      const body = upload.request.body as FormData;
      const file = body.get('logo') as File;
      expect(file).toBeInstanceOf(File);
      expect(file.name).toBe('logo.png');
      expect(new Uint8Array(await file.arrayBuffer())).toEqual(logoBytes);
      expect(body.get('logoResourceName')).toBe('logo.png');
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should not send the logo address itself, because the file replaces it', async () => {
      service.start();
      TestBed.tick();
      await answerLogo();

      const upload = httpTestingController.expectOne(uploadUrl);
      expect((upload.request.body as FormData).has('companyLogoUrl')).toBe(false);
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should upload only once, however often it is started or asked', async () => {
      service.start();
      service.start();
      TestBed.tick();
      await answerLogo();
      httpTestingController.expectOne(uploadUrl).flush(null, { status: 204, statusText: 'No Content' });
      await settle();

      expect(await service.syncOnce()).toBe(true);
      await flushWork();
      httpTestingController.expectNone(uploadUrl);
      httpTestingController.expectNone(logoUrl);
    });

    it('should not start a second upload while the first is still running', async () => {
      service.start();
      TestBed.tick();

      const second = service.syncOnce();
      await settle();

      expect(await second).toBe(false);
      await answerLogo();
      httpTestingController.expectOne(uploadUrl).flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should not upload again after signing out and back in once it worked', async () => {
      service.start();
      TestBed.tick();
      await answerLogo();
      httpTestingController.expectOne(uploadUrl).flush(null, { status: 204, statusText: 'No Content' });
      await settle();

      signedIn.set(false);
      await flushWork();
      signedIn.set(true);
      await flushWork();

      httpTestingController.expectNone(uploadUrl);
    });

    it('should try again at the next sign-in when the upload failed, and say nothing to the user', async () => {
      service.start();
      TestBed.tick();
      await answerLogo();
      httpTestingController.expectOne(uploadUrl).flush('down', { status: 503, statusText: 'Service Unavailable' });
      await settle();
      expect(console.warn).toHaveBeenCalled();

      signedIn.set(false);
      await flushWork();
      signedIn.set(true);
      TestBed.tick();
      await answerLogo();
      httpTestingController.expectOne(uploadUrl).flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should still upload the text details, without a logo, when the logo cannot be read', async () => {
      service.start();
      TestBed.tick();
      httpTestingController.expectOne(logoUrl).flush(new Blob(['missing']), { status: 404, statusText: 'Not Found' });
      await settle();

      const upload = httpTestingController.expectOne(uploadUrl);
      const body = upload.request.body as FormData;
      expect(body.get('companyName')).toBe('Acme Tools');
      expect(body.has('logo')).toBe(false);
      expect(body.has('logoResourceName')).toBe(false);
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should treat an empty logo file as no logo', async () => {
      service.start();
      TestBed.tick();
      httpTestingController.expectOne(logoUrl).flush(new Blob([]));
      await settle();

      const upload = httpTestingController.expectOne(uploadUrl);
      expect((upload.request.body as FormData).has('logo')).toBe(false);
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });
  });

  describe('when no one is signed in', () => {
    beforeEach(async () => {
      await loadConfig(company);
    });

    it('should send nothing, because the Reporting API would refuse it', async () => {
      service.start();
      await flushWork();

      httpTestingController.expectNone(logoUrl);
      httpTestingController.expectNone(uploadUrl);
    });

    it('should upload at the first sign-in', async () => {
      service.start();
      await flushWork();

      signedIn.set(true);
      TestBed.tick();
      await answerLogo();
      const upload = httpTestingController.expectOne(uploadUrl);
      expect((upload.request.body as FormData).get('companyName')).toBe('Acme Tools');
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });
  });

  describe('what is configured', () => {
    beforeEach(() => {
      signedIn.set(true);
    });

    it('should do nothing before the configuration is loaded', async () => {
      service.start();
      await flushWork();

      expect(await service.syncOnce()).toBe(false);
      httpTestingController.expectNone(uploadUrl);
    });

    it('should upload without a logo when no logo address is configured, and ask for no file', async () => {
      await loadConfig({ ...company, companyLogoUrl: '' });
      service.start();
      TestBed.tick();
      await settle();

      const upload = httpTestingController.expectOne(uploadUrl);
      const body = upload.request.body as FormData;
      expect(body.get('companyName')).toBe('Acme Tools');
      expect(body.has('logo')).toBe(false);
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should use a logo address without a folder part as it is', async () => {
      await loadConfig({ ...company, companyLogoUrl: 'logo.svg' });
      service.start();
      TestBed.tick();
      await answerLogo('logo.svg');

      const upload = httpTestingController.expectOne(uploadUrl);
      expect(((upload.request.body as FormData).get('logo') as File).name).toBe('logo.svg');
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should send empty text fields as empty values, so a blank setting clears the old one', async () => {
      await loadConfig({ ...company, companyLogoUrl: '', companyAddress: '', companyPhone: '' });
      service.start();
      TestBed.tick();
      await settle();

      const upload = httpTestingController.expectOne(uploadUrl);
      const body = upload.request.body as FormData;
      expect(body.get('companyAddress')).toBe('');
      expect(body.get('companyPhone')).toBe('');
      upload.flush(null, { status: 204, statusText: 'No Content' });
      await settle();
    });

    it('should send nothing when no company detail is configured', async () => {
      await loadConfig({ reportingApiUrl: 'https://reporting.test/api/' });
      service.start();
      await flushWork();

      httpTestingController.expectNone(uploadUrl);
    });

    it('should send nothing when there is no Reporting API address', async () => {
      await loadConfig({ ...company, reportingApiUrl: '' });
      service.start();
      await flushWork();

      httpTestingController.expectNone(logoUrl);
    });
  });
});
