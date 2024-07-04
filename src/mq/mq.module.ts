import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqService } from './mq.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'deliveryService',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [MqService],
  exports: [MqService],
})
export class MqModule {}
