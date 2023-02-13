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

    switch (this.framework) {
      case 'express':
        result.push(
          {
            label: `Install Express CLI`,
            code: `yarn global add express-generator`,
          },
          {
            label: `Create app`,
            code: `express ${this.name}`,
            docs: `https://expressjs.com/en/starter/generator.html`,
          }
        );
        break;
      case 'nest':
        result.push(
          {
            label: `Install Nest CLI`,
            code: `yarn global add @nestjs/cli`,
          },
          {
            label: `Create app`,
            code: `nest new ${this.name}`,
            docs: `https://docs.nestjs.com/`,
          }
        );
        break;
      case `next`:
        result.push({
          label: `Create app`,
          code: `yarn create next-app ${this.name}`,
          docs: `https://nextjs.org/docs/api-reference/create-next-app`,
        });
        break;
      case `django`:
        result.push(
          {
            label: `Install Django`,
            code: `pip3 install django`,
          },
          {
            label: `Create app`,
            code: `django-admin startproject ${this.name}`,
          }
        );
        break;
      case `flask`:
        result.push(
          {
            label: `Create app`,
            code: `mkdir ${this.name} && cd ${this.name} && python3 -m venv venv && . ./venv/bin/activate`,
          },
          {
            label: `Install Flask`,
            code: `pip3 install flask`,
            docs: `https://flask.palletsprojects.com/en/2.2.x/installation/`,
          }
        );
        break;
      case `fastapi`:
        result.push(
          {
            label: `Create app`,
            code: `mkdir ${this.name} && cd ${this.name} && python3 -m venv venv && . ./venv/bin/activate`,
          },
          {
            label: `Install FastAPI`,
            code: `pip3 install fastapi`,
            docs: `https://fastapi.tiangolo.com/`,
          }
        );
        break;
      case `spring`:
        result.push({
          label: `Configure and initialize app`,
          code: ``,
          docs: `https://start.spring.io/`,
        });
        break;
      case `ktor`:
        result.push({
          label: `Configure and initialize app`,
          code: ``,
          docs: `https://start.spring.io/`,
        });
        break;
      case `laravel`:
        result.push({
          label: `Create app`,
          code: `composer create-project laravel/laravel ${this.name}`,
          docs: `https://laravel.com/docs/9.x/installation`,
        });
        break;
      case `symfony`:
        result.push({
          label: `Create app`,
          code: `composer create-project symfony/skeleton:"6.2.*" ${this.name}`,
          docs: `https://symfony.com/doc/current/setup.html#creating-symfony-applications`,
        });
        break;
      case `gin`:
        result.push(
          {
            label: `Create app`,
            code: `mkdir ${this.name} && cd ${this.name} && go mod init ${this.name}`,
          },
          {
            label: `Install Gin`,
            code: `go get -u github.com/gin-gonic/gin`,
            docs: `https://gin-gonic.com/docs/quickstart/`,
          }
        );
        break;
      case `fiber`:
        result.push(
          {
            label: `Create app`,
            code: `mkdir ${this.name} && cd ${this.name} && go mod init ${this.name}`,
          },
          {
            label: `Install Fiber`,
            code: `go get -u github.com/gofiber/fiber/v2`,
            docs: `https://docs.gofiber.io/`,
          }
        );
        break;
      case `rails`:
        result.push(
          {
            label: `Install Rails CLI`,
            code: `gem install rails`,
          },
          {
            label: `Create app`,
            code: `rails new ${this.name}`,
            docs: `https://guides.rubyonrails.org/getting_started.html`,
          }
        );
        break;
      case `rocket`:
        result.push(
          {
            label: `Create app`,
            code: `cargo new ${this.name}`,
          },
          {
            label: `Install Rocket`,
            code: `echo "rocket = \\"0.4.10\\"" > Cargo.toml`,
            docs: `https://rocket.rs/v0.4/guide/getting-started/`,
          }
        );
        break;
      case `asp.net`:
        result.push({
          label: `Create app`,
          code: `dotnet new webapp --name ${this.name} --output output`,
        });
        break;
      case `vapor`:
        result.push(
          {
            label: `Install Vapor`,
            code: ``,
            docs: `https://docs.vapor.codes/install/linux/`,
          },
          {
            label: `Create app`,
            code: `vapor new ${this.name} --no`,
            docs: `https://docs.vapor.codes/getting-started/hello-world/`,
          }
        );
        break;
      case `phoenix`:
        result.push({
          label: `Create app`,
          code: `mix phx.new ${this.name}`,
          docs: `https://hexdocs.pm/phoenix/up_and_running.html`,
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

    return result;
  }
}
