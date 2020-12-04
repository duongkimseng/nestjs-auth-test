import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    database: 'nestjs-auth-test',
    password: '',
    autoLoadEntities: true,
    synchronize: true,
  }),
    
    AuthModule, 
    UserModule,],
  providers: [AppService],
})
export class AppModule {}
