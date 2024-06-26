import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MqService {
  constructor(
    @Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
  ) {}

  async emitEvent(eventName: string, message: any) {
    console.log(`Emitting event ${eventName} with message:`, message);
    return this.client.emit(eventName, message);
  }
}
