import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { GameService } from "./services/game.service";
import { AnalyticsService } from './services/analytics.service';


@Component({
  selector: "app-root",
  standalone: true,
  imports: [],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  readonly game = inject(GameService);
  private readonly analytics = inject(AnalyticsService);

  readonly instagramUrl = 'https://www.instagram.com/';

  ngOnInit(): void {
    this.analytics.track('APP_OPENED');
  }

  start(): void {
    this.game.start();
  }

  selectAnswer(optionId: string): void {
    this.game.selectAnswer(optionId);
  }

  nextFromReaction(): void {
    this.game.nextFromReaction();
  }

  nextFromTheory(): void {
    this.game.nextFromTheory();
  }

  nextFromReveal(): void {
    this.game.nextFromReveal();
  }

  complete(): void {
    this.game.complete();
  }
}
