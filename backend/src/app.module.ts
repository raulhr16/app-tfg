import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { User } from './user/user.entity';
import { Vote } from './vote/vote.entity';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Vote],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    VoteModule,
    PrometheusModule.register(),
  ],
})
export class AppModule {}
