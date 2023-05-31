import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/users/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserBanEmail(user: UserModel) {
    await this.mailerService.sendMail({
      to: 'igrekzero@gmail.com',
      from: 'Поддержка "Invest In Skills"',
      subject: 'Бан аккаунта',
      html: `<p>Дорогой ${user.first_name}. Вы забанены на платформе</p>`,
    });
  }
}
