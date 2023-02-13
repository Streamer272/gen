import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Title } from '@angular/platform-browser';
import { AnswerPart } from '../answer';

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss'],
})
export class BackendComponent {
  @ViewChild('stepper') stepper?: ElementRef;
  name?: string;
  framework?: string;

  constructor(private titleService: Title) {
    this.titleService.setTitle('New - backend');
  }

  setName(value: string) {
    this.name = value;
  }

  setFramework(event: MatRadioChange) {
    this.framework = event.value;
  }

  reset() {
    this.name = undefined;
    this.framework = undefined;
    // @ts-ignore
    this.stepper?.reset();
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  computeAnswer(): AnswerPart[] {
    const result = [];

    // express, nest, next, django, flask, fastapi, spring, ktor, laravel, symfony, gin, fiber, rails, rocket, asp.nett, vapor, phoenix
    switch (this.framework) {
      case 'express':
        result.push(
          {
            label: `Install Express CLI`,
            code: `yarn global add express-generator`,
            docs: `https://expressjs.com/en/starter/generator.html`
          },
          {
            label: `Create app`,
            code: `express ${this.name}`
          }
        );
        break;
      default:
        return [
          {
            label: `Error occurred`,
            code: `sudo reboot # have you tried turning it off and on again?`,
          },
        ];
    }

    return result;
  }
}
