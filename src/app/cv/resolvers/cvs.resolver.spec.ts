import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cvsResolver } from './cvs.resolver';

describe('cvsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cvsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
