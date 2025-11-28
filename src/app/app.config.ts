import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { withHashLocation } from '@angular/router';

/**
 * App Configuration
 * 
 * @description
 * Konfiguration der Angular-Anwendung.
 * Hier werden globale Provider und Routing-Strategien definiert.
 * 
 * @see {@link https://angular.io/guide/standalone-components}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    /**
     * Routing Configuration
     * 
     * @description
     * Verwendung der HashLocationStrategy (`/#/route`).
     * Dies ist notwendig für die Integration in Grav CMS, da Grav das Routing
     * auf Server-Seite übernimmt und Angular nur den Hash-Teil der URL steuern darf.
     * 
     * @example http://example.com/eol/#/quiz
     */
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch())
  ]
};
