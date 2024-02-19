import { TestBed } from '@angular/core/testing';

import { StateManagementService } from './state-management.service';
import {HttpClientModule} from "@angular/common/http";

describe('StateManagementService', () => {
  let service: StateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(StateManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
