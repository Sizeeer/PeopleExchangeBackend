import { Module } from '@nestjs/common';
import { TransactionsRepository } from 'src/transactions/transactions.repository';

@Module({
  imports: [],
  providers: [TransactionsRepository],
  exports: [TransactionsRepository],
})
export class TransactionsModule {}
