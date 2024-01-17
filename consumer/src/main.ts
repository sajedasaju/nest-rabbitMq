import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,

        options: {
            urls: [`amqp://admin:admin@localhost:5672`],
            queue: 'rabbitmq-queue-test',
            queueOptions: {
                durable: true,
            },
            noAck: false,
            // Get one by one
            prefetchCount: 1,
        },
    });



    await app.startAllMicroservices();
    await app.listen(3001);
    console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();

/*async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();*/
