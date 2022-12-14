import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserAddressModule } from './user-address/user-address.module';
import * as dotenv from 'dotenv';
import { ProfileController } from './profile.controller';
dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    UserAddressModule,
  ],
  controllers: [ProfileController],
  providers: [],
})
export class AppModule {}
