import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CachingInterceptor } from './cache/cache-interceptor.service';
import { LoggingInterceptor } from './logging/logging-interceptor.service';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
