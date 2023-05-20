import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ROLES } from 'src/constants/roles';
import { InvestInBodyDto } from 'src/wallet/dto/investInBody.dto';
import { ReturnInvestementsBodyDto } from 'src/wallet/dto/returnInvestementsBody.dto';
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

  @Post('invest-in')
  @UseGuards(RoleGuard(ROLES.Investor))
  async investIn(@Body() investInBody: InvestInBodyDto) {
    return this.walletService.investIn(investInBody);
  }

  @Post('withdraw')
  @UseGuards(RoleGuard(ROLES.TalentPerson))
  async withdraw() {
    return 'Ok';
  }

  @UseGuards(RoleGuard(ROLES.TalentPerson))
  @Post('return')
  returnInvestements(@Body() returnInvestementsDto: ReturnInvestementsBodyDto) {
    return this.walletService.returnInvestements(returnInvestementsDto);
  }
}
