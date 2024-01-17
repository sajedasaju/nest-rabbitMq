import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createServer } from "http";
import { Server } from "socket.io";
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload
} from '@nestjs/microservices';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('rabbit-mq-producer')
  public async execute(
      @Payload() data: any,
      @Ctx() context: RmqContext
  ) {
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    console.log('data=========consumer get ', data);
    channel.ack(orginalMessage);
  }
}
