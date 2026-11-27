import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AuthService } from '../../services/auth-service';
import { UserMenu } from './user-menu';

describe('UserMenu', () => {
  const userName = signal('Pat Admin');
  let logout: ReturnType<typeof vi.fn>;

  const render = () => {
    const fixture = TestBed.createComponent(UserMenu);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  };

  beforeEach(() => {
    logout = vi.fn().mockResolvedValue(undefined);
    TestBed.configureTestingModule({
      imports: [UserMenu],
      providers: [{ provide: AuthService, useValue: { userName, logout } }],
    });
  });

  it('should show who is signed in', () => {
    expect(render().querySelector('.signedInAs')?.textContent).toContain('Pat Admin');
  });

  it('should sign out when the button is pressed', () => {
    const element = render();

    element.querySelector('button')!.click();

    expect(logout).toHaveBeenCalledTimes(1);
  });
});
