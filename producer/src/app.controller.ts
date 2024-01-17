import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {RabbitMQService} from "./rabbitmq-service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly rabbitmqService:RabbitMQService) {}
  @Get()
  async getHello() {
    await this.rabbitmqService.send('rabbit-mq-producer', {
      message: this.appService.getHello(),
    });
    console.log('gethello');
    return 'Message sent to the queue!';
  }

  /*@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/
}
