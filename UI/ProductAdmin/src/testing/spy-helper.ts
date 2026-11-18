import { Type } from '@angular/core';
import { Mock, vi } from 'vitest';

/** A class where every method is a vitest mock. */
export type Spy<T> = { [K in keyof T]: T[K] extends (...args: infer A) => infer R ? Mock<(...args: A) => R> : T[K] };

/**
 * A stand-in for a class where every method (including inherited ones) is a vitest mock, so a spec can say
 * what it returns with mockReturnValue(...) and check calls with toHaveBeenCalled().
 * (This is what the jasmine-auto-spies package did for the old Karma/Jasmine setup.)
 */
export function createSpyFromClass<T>(cls: Type<T>): Spy<T> {
  const spy: Record<string, unknown> = {};
  for (let proto = cls.prototype; proto && proto !== Object.prototype; proto = Object.getPrototypeOf(proto)) {
    for (const name of Object.getOwnPropertyNames(proto)) {
      if (name === 'constructor' || name in spy) {
        continue;
      }
      if (typeof Object.getOwnPropertyDescriptor(proto, name)?.value === 'function') {
        spy[name] = vi.fn();
      }
    }
  }
  return spy as Spy<T>;
}

/** A stand-in object with the named methods, each a vitest mock. */
export function createSpyObj<T extends string>(methods: T[]): Record<T, Mock> {
  return Object.fromEntries(methods.map((method) => [method, vi.fn()])) as Record<T, Mock>;
}
