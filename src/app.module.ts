import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule,
    ConfigModule.forRoot({ isGlobal: true, }),
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule], inject: [ConfigService], useFactory: async (configService: ConfigService) => {
          const uri = configService.get<string>("MONGODB");

          return {
            uri,
          };
        },
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
