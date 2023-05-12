import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { ROLES } from 'src/constants/roles';
import { WalletService } from 'src/wallet/wallet.service';

// @UseGuards(JwtAuthenticationGuard)
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('balance')
  async getBalance(@Query('address') address: string) {
    const etherBalance = await this.walletService.getBalance(address);

    return etherBalance;
  }

  @Post('invest-in')
  @UseGuards(RoleGuard(ROLES.Investor))
  async investIn() {
    return 'invest-in';
  }

  @Post('withdraw')
  @UseGuards(RoleGuard(ROLES.TalentPerson))
  async withdraw() {
    return 'Ok';
  }
}
