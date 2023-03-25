import { Component, ElementRef, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AnswerPart } from '../answer';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent {
  @ViewChild('stepper') stepper?: ElementRef;
  name?: string;
  description?: string;
  command?: string;
  user: string = 'root';

  constructor(private titleService: Title) {
    this.titleService.setTitle('New - service');
  }

  setName(value: string) {
    this.name = value;
  }

  setDescription(value: string) {
    this.description = value;
  }

  setCommand(value: string) {
    this.command = value;
  }

  setUser(value: string) {
    this.user = value;
  }

  reset() {
    this.name = undefined;
    this.description = undefined;
    this.command = undefined;
    this.user = 'root';
    // @ts-ignore
    this.stepper?.reset();
  }

  copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  computeAnswer(): AnswerPart[] {
    const result = [];

    result.push(
      {
        label: 'Add service file',
        code: `echo "[Unit]<br>
Description=${this.description}<br>
After=network.target<br>
StartLimitIntervalSec=0\\n<br>
[Service]\n<br>
Type=simple\n<br>
Restart=always<br>
RestartSec=1<br>
User=${this.user}<br>
ExecStart=${this.command}\\n<br>
[Install]<br>
WantedBy=multi-currentUser.target" > /lib/systemd/system/${this.name}.service`,
        docs: `https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units`,
      },
      {
        label: 'Enable service',
        code: `systemctl enable ${this.name}`,
        docs: `https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units`,
      }
    );

    return result;
  }
}
