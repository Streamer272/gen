import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gen';
  framework?: string;
  scripting?: string;
  styling?: string;

  computeAnswer() {

  }

  setFramework(event: MatRadioChange) {
    this.framework = event.value;
  }

  setScripting(event: MatRadioChange) {
    this.scripting = event.value;
  }

  setStyling(event: MatRadioChange) {
    this.styling = event.value;
  }
}
