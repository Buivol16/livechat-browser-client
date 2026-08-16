import {
  ApplicationConfig,
  inject,
  Injector,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import initKeycloak from './chatapp/init/keycloak-init';
import NotificationService from './chatapp/services/notification/notificationservice';
import { addAuthorizationHeaderInterceptor } from './chatapp/interceptors/addheader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([addAuthorizationHeaderInterceptor])),
    provideAppInitializer(async () => {
      const injector = inject(Injector);
      await initKeycloak();
      const notificationService = injector.get(NotificationService);
      notificationService.listenNotification();
      return notificationService;
    }),
  ],
};
