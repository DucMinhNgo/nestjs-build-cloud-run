import { Controller, Get, Logger, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('test-exit')
  testExit() {
    new Error("Test Exit Error")
    // Logger.error("[] Test Exit Error Logger")
    process.exit(1);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test-error')
  testError(): string {
    return this.appService.testError();
  }

  @Get('test-fastify-error')
  testFastifyError(
    @Req() request: FastifyRequest, @Res() reply: FastifyReply
  ) {
    reply.status(400).send({ message: 'Hello from NestJS Fastify controller!' });
  }
}
