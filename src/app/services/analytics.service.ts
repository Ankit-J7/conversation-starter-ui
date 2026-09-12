import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AnalyticsEvent {
  sessionId: string;
  eventType: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private readonly http = inject(HttpClient);

  private readonly SESSION_KEY = 'conversation_app_session_id';

  /*
   * During local development:
   * Angular → http://localhost:4200
   * Spring Boot → http://localhost:8080
   */
  private readonly API_URL = 'https://conversation-starter-service.onrender.com/api/events';

  getSessionId(): string {
    let sessionId = sessionStorage.getItem(this.SESSION_KEY);

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem(this.SESSION_KEY, sessionId);
    }

    return sessionId;
  }

  track(
    eventType: string,
    metadata?: Record<string, unknown>
  ): void {

    const event: AnalyticsEvent = {
      sessionId: this.getSessionId(),
      eventType,
      timestamp: new Date().toISOString(),
      metadata
    };

    this.http.post<void>(
      this.API_URL,
      event
    ).subscribe({
      next: () => {
        console.log(`Analytics tracked: ${eventType}`);
      },

      error: (error) => {
        /*
         * Analytics failure should NEVER
         * break the actual app experience.
         */
        console.error(
          `Failed to track event: ${eventType}`,
          error
        );
      }
    });
  }
}