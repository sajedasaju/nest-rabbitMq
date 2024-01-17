import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {lastValueFrom} from "rxjs";
@Injectable()
export class RabbitMQService {
    constructor(
        @Inject('rabbitmq-module') private readonly client: ClientProxy,
    ) {}
    public async send(pattern: string, data: any): Promise<any> {
        console.log('send====', data);
        try {
            const response = await lastValueFrom(this.client.emit(pattern, data));
            console.log('send====1', data);
            return response;
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
}