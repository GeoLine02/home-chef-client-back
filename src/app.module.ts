import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './configuration/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import {
  User,
  Restaurant,
  RestaurantTypesJunctions,
  RestaurantSettings,
  Products,
  RestaurantTypes,
  FavoriteRestaurants,
  UserAddress,
  PaymentTransactions,
  UserPaymentMethod,
  Orders,
  OrderProducts,
  GlobalConfig,
  RestaurantAddress,
  Locales,
} from './models/index';
import { SearchModule } from './search/search.module';
import { RestaurantCategoriesModule } from './restaurant-types/restaurant-types.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RestaurantSettingsModule } from './restaurant-settings/restaurant-settings.module';
import { ProductsModule } from './products/products.module';
import { ProfileModule } from './profile/profile.module';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { GlobalConfModule } from './global-conf/global-conf.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/src/configuration/envs/dev.env`,
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        database: configService.get<string>('db.dbName'),
        username: configService.get<string>('db.dbUser'),
        password: configService.get<string>('db.dbPassword'),
        define: { timestamps: false },
        logging: false,
        models: [
          User,
          UserAddress,
          UserPaymentMethod,
          Restaurant,
          RestaurantSettings,
          RestaurantTypes,
          RestaurantTypesJunctions,
          RestaurantAddress,
          FavoriteRestaurants,
          Products,
          PaymentTransactions,
          Orders,
          OrderProducts,
          GlobalConfig,
          Locales,
        ],
        pool: {
          min: 0,
          max: 5,
          idle: 10000,
        },
      }),
    }),
    UserModule,
    AuthModule,
    RestaurantModule,
    SearchModule,
    RestaurantCategoriesModule,
    RestaurantSettingsModule,
    ProductsModule,
    ProfileModule,
    PaymentsModule,
    OrdersModule,
    ConfigModule,
    GlobalConfModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
