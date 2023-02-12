import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gen';
  query: Map<string, string> = new Map<string, string>()

  public change(key: string, event: MatRadioChange) {
    this.query.set(key, event.value)
  }
}
