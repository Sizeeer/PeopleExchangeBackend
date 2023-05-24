import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser.interface';
import { ROLES } from 'src/constants/roles';
import { InvestInBodyDto } from 'src/wallet/dto/investInBody.dto';
import { WalletService } from 'src/wallet/wallet.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('balance')
  async getBalance(@Query('userId') userId: number) {
    const etherBalance = await this.walletService.getBalance(userId);

    return etherBalance;
  }

  @Post('deposit')
  async deposit(@Query('userId') userId: number) {
    return this.walletService.deposit(userId);
  }

  @Post('recreate')
  async recreateWallet(@Query('userId') userId: number) {
    return this.walletService.recreateWallet(userId);
  }

  @Post('invest-in')
  @UseGuards(RoleGuard(ROLES.Investor))
  async investIn(
    @Body() investInBody: InvestInBodyDto,
    @Req() req: RequestWithUser,
  ) {
    return this.walletService.investIn(req.user.id, investInBody);
  }

  @UseGuards(RoleGuard(ROLES.TalentPerson))
  @Post('return-investements')
  returnInvestements(@Req() req: RequestWithUser) {
    return this.walletService.returnInvestements(req.user.id);
  }
}
