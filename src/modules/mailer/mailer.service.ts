import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EnvConfigService } from '../../envConfig/envConfig.service';
import { OnEvent } from '@nestjs/event-emitter';
import * as handlebars from 'handlebars';
import * as fs from 'fs';

@Injectable()
export class MailerService {
  private transporter;

  constructor(private envConfig: EnvConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.envConfig.getString('MAIL_USERNAME'),
        pass: this.envConfig.getString('MAIL_PASSWORD'),
      },
    });
  }
  async sendMail(
    to: string,
    subject: string,
    templateName: string,
    context: Record<string, any>,
  ): Promise<void> {
    const template = this.compileTemplate(templateName, context);

    const mailOptions = {
      from: this.envConfig.getString('MAIL_SENDER'),
      to,
      subject,
      html: template,
    };

    await this.transporter.sendMail(mailOptions);
  }

  private compileTemplate(
    templateName: string,
    context: Record<string, any>,
  ): string {
    const templatePath = `${__dirname}/templates/${templateName}.template.hbs`; // Adjust the path accordingly
    const templateContent = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(templateContent);
    return compiledTemplate(context);
  }
}
