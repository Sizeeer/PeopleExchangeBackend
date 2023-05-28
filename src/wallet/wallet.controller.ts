import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser.interface';
import { HTTP_STATUS_CODES } from 'src/constants/httpStatusCodes';
import { ROLES } from 'src/constants/roles';
import { InvestInBodyDto } from 'src/wallet/dto/investInBody.dto';
import { WalletService } from 'src/wallet/wallet.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Get('balance')
  async getBalance(@Query('userId') userId: number) {
    const etherBalance = await this.walletService.getBalance(userId);

    return etherBalance;
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Post('deposit')
  async deposit(@Query('userId') userId: number) {
    return this.walletService.deposit(userId);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Post('recreate')
  async recreateWallet(@Query('userId') userId: number) {
    return this.walletService.recreateWallet(userId);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @UseGuards(RoleGuard(ROLES.Investor))
  @Post('invest')
  async investIn(
    @Body() investInBody: InvestInBodyDto,
    @Req() req: RequestWithUser,
  ) {
    return this.walletService.investIn(req.user.id, investInBody);
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @UseGuards(RoleGuard(ROLES.TalentPerson))
  @Post('return-investements')
  returnInvestements(@Req() req: RequestWithUser) {
    return this.walletService.returnInvestements(req.user.id);
  }
}
