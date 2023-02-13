import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Title } from '@angular/platform-browser';

interface AnswerPart {
  label: string;
  code: string;
  docs?: string;
}

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss'],
})
export class FrontendComponent {
  @ViewChild('stepper') stepper?: ElementRef;
  name?: string;
  framework?: string;
  scripting?: string;
  styling?: string;

  constructor(private titleService: Title) {
    this.titleService.setTitle("New - frontend")
  }

  setName(value: string) {
    this.name = value;
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

  reset() {
    this.name = undefined;
    this.framework = undefined;
    this.scripting = undefined;
    this.styling = undefined;
    // @ts-ignore
    this.stepper?.reset();
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  computeAnswer(): AnswerPart[] {
    const result = [];
    const createVite = `yarn create vite ${this.name}`;
    const isTs = this.scripting === 'typescript';
    const tsSuffix = isTs ? '-ts' : '';

    switch (this.framework) {
      case 'plain':
        result.push({
          label: `Create app`,
          code: `${createVite} --template vanilla${tsSuffix}`,
        });
        break;
      case 'angular':
        result.push(
          {
            label: `Install Angular CLI`,
            code: `sudo npm install --global @angular/cli`,
          },
          {
            label: `Create app`,
            code: `ng new ${this.name}${
              ['css', 'scss'].includes(this.styling || '')
                ? ' --style=${this.styling}'
                : ''
            }`,
          }
        );
        break;
      case 'react':
        result.push({
          label: `Create app`,
          code: `${createVite} --template react${tsSuffix}`,
        });
        break;
      case 'next':
        result.push({
          label: `Create app`,
          code: `yarn create next-app ${this.name} ${
            isTs ? '--typescript' : ''
          }`,
        });
        break;
      case 'vue':
        result.push({
          label: `Create app`,
          code: `${createVite} --template vue${tsSuffix}`,
        });
        break;
      case 'nuxt':
        result.push({
          label: `Create app`,
          code: `npx nuxi init ${this.name}`,
        });
        break;
      case 'svelte':
        result.push({
          label: `Create app`,
          code: `${createVite} --template svelte${tsSuffix}`,
        });
        break;
      case 'svelte-kit':
        result.push({
          label: `Create app`,
          code: `yarn create svelte ${this.name}`,
        });
        break;
      default:
        return [
          {
            label: `Error occurred`,
            code: `sudo reboot # have you tried turning it off and on again?`,
          },
        ];
    }

    if (this.framework !== 'angular' && this.styling === 'scss') {
      result.push({
        label: `Add SASS compiler`,
        code: `yarn add --dev sass`,
        docs: `https://sass-lang.com/guide`,
      });
    } else if (this.styling === 'tailwind') {
      result.push({
        label: `Add TailWindCSS`,
        code: `yarn add --dev tailwindcss`,
      });
      result.push({
        label: `Initialize TailWindCSS`,
        code: `npx tailwindcss init`,
        docs: `https://tailwindcss.com/docs/installation`,
      });
    } else if (this.styling === 'bootstrap') {
      result.push({
        label: `Add Bootstrap`,
        code: `yarn add bootstrap`,
        docs: `https://getbootstrap.com/`,
      });
    }

    return result;
  }
}
