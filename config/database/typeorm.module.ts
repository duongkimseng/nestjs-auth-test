import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeormConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        database: config.get<string>('DATABASE'),
        username: config.get<string>('USERNAME'),
        password: config.get<string>('PASSWORD'),
        host: config.get<string>('HOST'),
        port: parseInt(config.get('PORT')),
        autoLoadEntities: true,
        synchronize: true,
        type: 'postgres',
        entities: ["dist/**/*.entity{.ts, .js}"],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class TypeormConfigModule {}
