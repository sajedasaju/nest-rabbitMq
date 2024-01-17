import { Module } from '@nestjs/common';
import { ClientsModule,ClientProxyFactory, Transport } from '@nestjs/microservices';
import {RabbitMQService} from "./rabbitmq-service";
@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'rabbitmq-module',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://admin:admin@localhost:5672'],
                    queue: 'rabbitmq-queue-test',
                    queueOptions: {
                        durable: true,
                    }
                },
            },
        ]),
    ],
    controllers: [],
    providers: [RabbitMQService],
    exports: [RabbitMQService],
})
export class RabbitMQModule {}